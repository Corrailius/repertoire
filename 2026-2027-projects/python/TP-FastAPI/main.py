from typing import Optional

from fastapi import FastAPI, Query

app = FastAPI(title="API Bibliothèque")

@app.get("/")
def read_root():
    return {"message": "Hello World"}

books = [
    {"id": 1, "title": "1984", "author": "George Orwell"},
    {"id": 2, "title": "Le Petit Prince", "author": "Antoine de Saint-Exupéry"},
    {"id": 3, "title": "Fahrenheit 451", "author": "Ray Bradbury"},
    {"id": 4, "title": "L'Étranger", "author": "Albert Camus"},
    {"id": 5, "title": "Dune", "author": "Frank Herbert"},
    {"id": 6, "title": "Le Meilleur des mondes", "author": "Aldous Huxley"},
]


@app.get("/books")
def get_books(author: Optional[str] = Query(None, description="Filtrer les livres par auteur")):
    """Étape 1 (liste) + bonus Étape 5 (paramètre optionnel de filtre)."""
    if author:
        return [b for b in books if b["author"].lower() == author.lower()]
    return books


@app.get("/books/{book_id}")
def get_book(book_id: int):
    """Étape 1 (détail avec paramètre dynamique)."""
    for book in books:
        if book["id"] == book_id:
            return book
    return {"error": "Livre non trouvé"}


@app.post("/books")
def create_book(book: dict):
    """Étape 2 (création)."""
    books.append(book)
    return book


@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    """Bonus Étape 5 (suppression)."""
    for book in books:
        if book["id"] == book_id:
            books.remove(book)
            return {"message": f"Livre {book_id} supprimé"}
    return {"error": "Livre non trouvé"}

book_reviews = {
    1: [{"user": "alice", "comment": "Un classique incontournable."}],
    3: [{"user": "bob", "comment": "Toujours d'actualité."}],
}


@app.get("/books/{book_id}/reviews")
def get_book_reviews(book_id: int):
    return book_reviews.get(book_id, [])

authors = [
    {"id": 1, "name": "George Orwell", "nationality": "britannique"},
    {"id": 2, "name": "Antoine de Saint-Exupéry", "nationality": "française"},
    {"id": 3, "name": "Ray Bradbury", "nationality": "américaine"},
    {"id": 4, "name": "Albert Camus", "nationality": "française"},
    {"id": 5, "name": "Frank Herbert", "nationality": "américaine"},
    {"id": 6, "name": "Aldous Huxley", "nationality": "britannique"},
]


@app.get("/authors")
def get_authors():
    """Étape 2 (liste, deuxième ressource)."""
    return authors


@app.get("/authors/{author_id}")
def get_author(author_id: int):
    """Étape 2 (détail, deuxième ressource)."""
    for author in authors:
        if author["id"] == author_id:
            return author
    return {"error": "Auteur non trouvé"}


@app.post("/authors")
def create_author(author: dict):
    """Étape 2 (création, deuxième ressource)."""
    authors.append(author)
    return author