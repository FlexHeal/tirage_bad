<?php

require "elo.php"; // <-- ton fichier principal

// ------ UTILS POUR LES TESTS ------
function reset_players_folder()
{
    if (!is_dir("players")) mkdir("players");
    $files = glob("players/*");
    foreach ($files as $f) unlink($f);
}

function assert_equals($a, $b, $msg = "")
{
    if ($a !== $b) {
        echo "❌ ECHEC : $msg (attendu $b, obtenu $a)" . PHP_EOL;
    } else {
        echo "✅ OK : $msg" . PHP_EOL;
    }
}

function assert_min_elo($val, $msg = "")
{
    if ($val < 400) {
        echo "❌ ECHEC : $msg (ELO = $val, minimum attendu = 400)" . PHP_EOL;
    } else {
        echo "✅ OK : $msg" . PHP_EOL;
    }
}


// ------ DÉBUT DES TESTS ------
reset_players_folder();
echo "=== TESTS ELO ===" . PHP_EOL;


// --- Test get_elo() création automatique ---
$eloA = get_elo("A");
assert_equals($eloA, 400, "Création auto du joueur A");

// --- Test set_elo() valeur trop basse ---
set_elo("A", 50);
$eloA = get_elo("A");
assert_equals($eloA, 400, "set_elo ne descend pas en dessous de 400");

// --- Test calc_elo_simple() ---
reset_players_folder();
get_elo("A"); // 400
get_elo("B"); // 400

calc_elo_simple("A", "B");

$eloA = get_elo("A");
$eloB = get_elo("B");

assert_min_elo($eloA, "calc_elo_simple A ELO >= 400");
assert_min_elo($eloB, "calc_elo_simple B ELO >= 400");
assert_equals($eloA > $eloB, true, "A doit gagner des points, B en perdre");

// --- Test calc_elo_simple avec gros écart ---
reset_players_folder();
set_elo("A", 2000);
set_elo("B", 400);

calc_elo_simple("A", "B");

$eloA = get_elo("A");
$eloB = get_elo("B");

assert_min_elo($eloA, "A reste >400 (gros elo)");
assert_min_elo($eloB, "B reste >=400");

// --- Test calc_elo_double() ---
reset_players_folder();
get_elo("A"); // team W
get_elo("B"); // team W
get_elo("C"); // team L
get_elo("D"); // team L

calc_elo_double(["A", "B"], ["C", "D"]);

$eloA = get_elo("A");
$eloB = get_elo("B");
$eloC = get_elo("C");
$eloD = get_elo("D");

assert_min_elo($eloA, "Double : A >= 400");
assert_min_elo($eloB, "Double : B >= 400");
assert_min_elo($eloC, "Double : C >= 400");
assert_min_elo($eloD, "Double : D >= 400");

assert_equals($eloA > $eloC, true, "A doit monter, C descendre");

echo "\n=== FIN DES TESTS ===" . PHP_EOL;
