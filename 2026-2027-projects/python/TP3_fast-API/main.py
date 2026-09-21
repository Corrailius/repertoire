from enum import Enum

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, model_validator

app = FastAPI()


class CharacterClass(str, Enum):
    WARRIOR = "warrior"
    MAGE = "mage"
    ARCHER = "archer"


class Item(BaseModel):
    name: str
    rarity: str


class PlayerProfile(BaseModel):
    username: str
    level: int
    hp: int
    max_hp: int
    character_class: CharacterClass
    inventory: list[Item] = []
    is_banned: bool = False
    strength: int
    agility: int
    intelligence: int

    @model_validator(mode="after")
    def validate_username(self):
        if len(self.username) < 3 or len(self.username) > 20:
            raise ValueError(
                "le username doit contenir entre 3 et 20 caractères"
            )

        if " " in self.username:
            raise ValueError(
                "pas d'espace autorisé dans le username"
            )

        return self

    @model_validator(mode="after")
    def validate_level(self):
        if self.level < 1 or self.level > 99:
            raise ValueError(
                "le level doit être compris entre 1 et 99"
            )

        return self

    @model_validator(mode="after")
    def validate_hp(self):
        if self.hp < 0:
            raise ValueError("hp ne peut pas être négatif")

        if self.max_hp < 0:
            raise ValueError("max_hp ne peut pas être négatif")

        if self.hp > self.max_hp:
            raise ValueError(
                "hp ne peut pas dépasser max_hp"
            )

        return self

    @model_validator(mode="after")
    def validate_stats(self):
        if self.strength < 0:
            raise ValueError(
                "strength ne peut pas être négatif"
            )

        if self.agility < 0:
            raise ValueError(
                "agility ne peut pas être négatif"
            )

        if self.intelligence < 0:
            raise ValueError(
                "intelligence ne peut pas être négatif"
            )

        total = (
            self.strength
            + self.agility
            + self.intelligence
        )

        budget = 30

        if total > budget:
            raise ValueError(
                f"budget de points dépassé : {total}/{budget}"
            )

        return self

    @model_validator(mode="after")
    def check_inventory_duplicates(self):
        names = [item.name for item in self.inventory]

        if len(names) != len(set(names)):
            raise ValueError(
                "l'inventaire contient des objets en double"
            )

        return self


class PlayerPublic(BaseModel):
    username: str
    level: int


players_db: dict[int, PlayerProfile] = {}


@app.post("/players")
def create_player(player: PlayerProfile):
    new_id = len(players_db) + 1
    players_db[new_id] = player

    return {
        "id": new_id,
        "player": player
    }


@app.get("/players/{id}", response_model=PlayerPublic)
def get_player(id: int):
    if id not in players_db:
        raise HTTPException(
            status_code=404,
            detail="Joueur introuvable"
        )

    return players_db[id]
