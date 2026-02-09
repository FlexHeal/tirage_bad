<?php

function get_elo($joueur)
{
    $filename = "players/" . $joueur;
    if (file_exists($filename)) {
        $val = file_get_contents($filename);
        return max(400, intval($val));
    } else {
        file_put_contents($filename, 400);
        return 400;
    }
}

function set_elo($joueur, $val)
{
    $filename = "players/" . $joueur;
    file_put_contents($filename, max(400, round($val)));
}

function calc_elo_simple($joueurWinner, $joueurLoser)
{
    $Winner = get_elo($joueurWinner);
    $Loser = get_elo($joueurLoser);

    $K = 40;
    // Parties de la formule ELO
    $powerWinner = 10 ** ($Winner / 400);
    $powerLoser = 10 ** ($Loser / 400);

    // Variation ELO en cas de victoire
    $winElo = $K * (1 - ($powerWinner / ($powerWinner + $powerLoser)));
    $defeatElo = $K * (0 - ($powerWinner / ($powerWinner + $powerLoser)));

    set_elo($joueurWinner, $winElo + $Winner);
    set_elo($joueurLoser, $defeatElo + $Loser);
}

function calc_elo_double($joueursWinner, $joueursLoser)
{
    $K = 40;
    echo $joueursWinner . PHP_EOL . $joueursLoser;
    // Récupération des ELO individuels
    $W0 = get_elo($joueursWinner[0]);
    $W1 = get_elo($joueursWinner[1]);
    $L0 = get_elo($joueursLoser[0]);
    $L1 = get_elo($joueursLoser[1]);

    // Moyennes des équipes
    $eloWinnerTeam = ($W0 + $W1) / 2;
    $eloLoserTeam  = ($L0 + $L1) / 2;

    // ---- GAGNANTS ----
    // Joueur Winner0 contre moyenne des perdants
    $expectedW0 = 1 / (1 + 10 ** (($eloLoserTeam - $W0) / 400));
    $gainW0 = $K * (1 - $expectedW0);

    // Joueur Winner1 contre moyenne des perdants
    $expectedW1 = 1 / (1 + 10 ** (($eloLoserTeam - $W1) / 400));
    $gainW1 = $K * (1 - $expectedW1);

    // ---- PERDANTS ----
    // Joueur Loser0 contre moyenne des gagnants
    $expectedL0 = 1 / (1 + 10 ** (($eloWinnerTeam - $L0) / 400));
    $gainL0 = $K * (0 - $expectedL0);

    // Joueur Loser1 contre moyenne des gagnants
    $expectedL1 = 1 / (1 + 10 ** (($eloWinnerTeam - $L1) / 400));
    $gainL1 = $K * (0 - $expectedL1);

    // ---- Mise à jour des ELO ----
    set_elo($joueursWinner[0], $W0 + $gainW0);
    set_elo($joueursWinner[1], $W1 + $gainW1);
    set_elo($joueursLoser[0],  $L0 + $gainL0);
    set_elo($joueursLoser[1],  $L1 + $gainL1);
}

$categorie = $_GET['cat'];
$joueur1 = $_GET['joueur1'];
$joueur2 = $_GET['joueur2'];
echo $categorie . PHP_EOL . $joueur1 . PHP_EOL . $joueur2;
if ($categorie == "Simple") {
    calc_elo_simple($joueur1, $joueur2);
} else if ($categorie == "Double") {
    $joueur3 = $_GET['joueur3'];
    $joueur4 = $_GET['joueur4'];

    calc_elo_double([$joueur1, $joueur2], [$joueur3, $joueur4]);
}
