from enum import Enum

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, field_validator, model_validator

app = FastAPI()

class CharacterClass(str, Enum):
    WARRIOR = "warrior"
    MAGE = "mage"
    ARCHER = "archer"

class Item(BaseModel):
    name: str
    rarity: str

class PlayerProfile(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    level: int = Field(ge=1, le=99)

    hp: int = Field(ge=0)
    max_hp: int = Field(ge=0)

    character_class: CharacterClass
    inventory: list[Item] = []

    is_banned: bool = False

    strength: int = Field(ge=0)
    agility: int = Field(ge=0)
    intelligence: int = Field(ge=0)

    @field_validator("username")
    @classmethod
    def no_spaces(cls, value: str) -> str:
        if " " in value:
            raise ValueError("pas d'espace autorisé dans le username")
        return value

    @model_validator(mode="after")
    def check_hp(self):
        if self.hp > self.max_hp:
            raise ValueError("hp ne peut pas dépasser max_hp")
        return self

    @model_validator(mode="after")
    def check_stats_budget(self):
        total = self.strength + self.agility + self.intelligence
        budget = 30
        if total > budget:
            raise ValueError(f"budget de points dépassé : {total}/{budget}")
        return self

    @model_validator(mode="after")
    def check_inventory_duplicates(self):
        names = [item.name for item in self.inventory]
        if len(names) != len(set(names)):
            raise ValueError("l'inventaire contient des objets en double")
        return self

class PlayerPublic(BaseModel):
    username: str
    level: int

players_db: dict[int, PlayerProfile] = {}


@app.post("/players")
def create_player(player: PlayerProfile):
    new_id = len(players_db) + 1
    players_db[new_id] = player
    return {"id": new_id, "player": player}

@app.get("/players/{id}", response_model=PlayerPublic)
def get_player(id: int):
    if id not in players_db:
        raise HTTPException(status_code=404, detail="Joueur introuvable")
    return players_db[id]