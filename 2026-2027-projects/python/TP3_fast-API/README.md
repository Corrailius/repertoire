# A TRUE AND FAITHFUL ACCOUNTING OF THE BOUNDS SET UPON OUR PLAYER, WRIT IN THE OLDE TONGUE.

---

## Of the Preamble

Hark, thou who wouldst know the statutes governing our humble `PlayerProfile`! Attend well, for I shall not speak plainly — plain speech being a courtesy this document hath sworn an oath to withhold. What followeth is truth, dressed in doublet and hose, that thou mightst labour somewhat for thy understanding, as I did labour for the writing of it.

## Of the Name a Player Beareth

Let it be known that the `username`, that title by which a player is called amongst his fellows, must be neither too slight a word nor too sprawling a proclamation — for the law, as set down by `Field`, doth demand no fewer than three letters, nor more than twenty, lest the scribe's ledger (`min_length`, `max_length`) rebel against the offering. Furthermore, and this by a separate and more particular decree (`field_validator`), no space shall dwell within this name — for a name split by breath is no name at all, but two impostors wearing one crown, and the code shall cast such pretenders out with a `ValueError`, that most Elizabethan of curses.

## Of the Player's Station in Life

His `level`, that measure of how far he hath climbed from novice to veteran, is bound betwixt the humble first rung and the ninety-and-ninth — `ge=1, le=99` — for a level of naught would be no beginning at all, and a level past ninety-nine would be vanity unbecoming even a king.

## Of Vigour and its Ceiling

Two numbers govern the player's vitality: `hp`, his present vigour, and `max_hp`, the utmost vigour he may e'er possess. Both must be no less than naught (`ge=0`), for a life in negative numbers is a riddle even philosophers dare not solve. And by a further covenant — a `model_validator`, which is to say a judge that weighs two witnesses at once rather than one alone — his `hp` shall never o'erleap his `max_hp`. Should it try, the code shall speak thus: *"hp ne peut pas dépasser max_hp,"* which, translated from one dead tongue to another, meaneth simply: *thou hast asked for more life than thy vessel can hold, and it shall not be granted.*

## Of the Player's Calling

Each player must declare himself of one calling, and one only, from a closed and unalterable list — this is the `Enum` named `CharacterClass` — being either `warrior`, who trusteth in steel; `mage`, who trusteth in unseen forces; or `archer`, who trusteth in distance and patience. No fourth calling exists, nor shall the API entertain the fancy of one, though thou beg it prettily.

## Of the Satchel He Doth Carry

Within his `inventory`, a player may bear many `Item`s, each possessed of a `name` and a `rarity` — this being a model nested within a model, as a smaller chest is nested within a larger trunk. Yet heed this bonus statute, added for those who scorned rest and pressed onward: no two `Item`s within one satchel may share the selfsame `name`, for a doubled treasure is but a trick of the eye, and the code, ever suspicious, shall compare each item unto its fellows and reject the fraud.

## Of the Three Humours — Strength, Agility, and Wit

A player's `strength`, `agility`, and `intelligence` are each numbers no less than naught, yet together they must not exceed a treasury of thirty points in sum. This is the anti-cheat statute, lest some knave attempt to claim ninety-and-nine in every humour at once and thereby become a god rather than a player. The `model_validator` sums the three and, finding the total wanting of virtue, declareth: *"budget de points dépassé,"* and turns the petitioner away.

## Of What Is Shown, and What Is Hidden

Not all that is true of a player is fit for common eyes. The field `is_banned`, which telleth whether a player hath been cast out for wickedness, is known unto the ledger (`players_db`) but concealed from the public gaze by decree of `response_model=PlayerPublic` — a lesser, plainer likeness of the player, showing only his `username` and his `level`, as a portrait shows a face but not the sitter's private letters.

## Of the Player Who Cannot Be Found

Should one seek a player by his `id` and find no such soul within the ledger, the API shall not feign ignorance nor return an empty silence — nay, it shall raise `HTTPException(status_code=404, detail="Joueur introuvable")`, a formal and honest proclamation that the one sought doth not exist, delivered with the dignity of a herald and the number four-hundred-and-four, which scholars of a later age shall call "not found."

## An Envoi

Thus concludes this accounting, rendered deliberately tortuous, that the reading of it might cost thee near as much toil as the writing of it cost me. Go now, and test thy bounds in Swagger, for a law unread is a law untested, and a law untested is no law at all — merely a suggestion, and suggestions, as every player knows, are made to be ignored.

*Finis.*