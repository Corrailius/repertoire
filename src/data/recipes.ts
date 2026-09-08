interface recipeInterface {
    id: number;
    slug: string;
    name: string;
    description?: string;
    category: string;
    prepMinute?: string;
    cookMinute?: string;
    ingredient: string[];
    steps: string[];
}

const recipes: recipeInterface[] = [
    // ---------- CANADA ----------
    {
        id: 1,
        slug: "poutine",
        name: "Poutine",
        description: "Classic Quebec comfort food with crispy fries, cheese curds and hot gravy.",
        category: "plat",
        prepMinute: "15",
        cookMinute: "20",
        ingredient: [
            "1 kg russet potatoes, cut into fries",
            "2 cups cheese curds",
            "2 cups beef stock",
            "2 tbsp butter",
            "2 tbsp flour",
            "1 tbsp Worcestershire sauce",
            "Salt and pepper",
            "Vegetable oil for frying"
        ],
        steps: [
            "Soak the cut potatoes in cold water for 30 minutes, then pat dry.",
            "Fry the potatoes at 325°F (160°C) until pale and soft, about 5 minutes, then drain.",
            "Increase oil temperature to 375°F (190°C) and fry again until golden and crispy.",
            "Melt butter in a saucepan, whisk in flour to make a roux.",
            "Slowly whisk in beef stock and Worcestershire sauce, simmer until thickened.",
            "Season the gravy with salt and pepper.",
            "Place fries in a bowl, top with cheese curds, then pour hot gravy over everything.",
            "Serve immediately while the cheese curds are still squeaky."
        ]
    },
    {
        id: 2,
        slug: "butter-tarts",
        name: "Butter Tarts",
        description: "A classic Canadian pastry with a gooey, buttery filling.",
        category: "dessert",
        prepMinute: "20",
        cookMinute: "20",
        ingredient: [
            "12 unbaked tart shells",
            "1/2 cup butter, softened",
            "1 cup brown sugar",
            "2 large eggs",
            "1 tsp vanilla extract",
            "1 tbsp white vinegar",
            "1/2 cup raisins or pecans (optional)"
        ],
        steps: [
            "Preheat the oven to 400°F (200°C).",
            "Cream the butter and brown sugar together until smooth.",
            "Beat in the eggs, vanilla, and vinegar until well combined.",
            "Divide raisins or pecans evenly among the tart shells.",
            "Pour the filling into the shells, filling each about two-thirds full.",
            "Bake for 15-18 minutes until the filling is bubbly and the pastry is golden.",
            "Cool on a wire rack before serving."
        ]
    },
    {
        id: 3,
        slug: "soupe-aux-pois-canadienne",
        name: "Canadian Split Pea Soup",
        description: "A hearty, warming soup popular across Canada, especially in winter.",
        category: "soupe",
        prepMinute: "15",
        cookMinute: "90",
        ingredient: [
            "2 cups dried split peas",
            "1 ham hock or smoked ham bone",
            "1 onion, diced",
            "2 carrots, diced",
            "2 celery stalks, diced",
            "2 garlic cloves, minced",
            "8 cups water or stock",
            "1 bay leaf",
            "Salt and pepper"
        ],
        steps: [
            "Rinse the split peas and set aside.",
            "In a large pot, sauté the onion, carrots, celery, and garlic until softened.",
            "Add the ham hock, split peas, water, and bay leaf.",
            "Bring to a boil, then reduce heat and simmer for about 1.5 hours, stirring occasionally.",
            "Remove the ham hock, shred the meat, and return it to the pot.",
            "Discard the bay leaf, season with salt and pepper, and serve hot."
        ]
    },

    // ---------- NORWAY ----------
    {
        id: 4,
        slug: "farikal",
        name: "Fårikål",
        description: "Norway's national dish: lamb and cabbage stew simmered until tender.",
        category: "plat",
        prepMinute: "20",
        cookMinute: "150",
        ingredient: [
            "1.5 kg lamb shoulder or neck, bone-in, cut into pieces",
            "1 kg cabbage, cut into wedges",
            "2 tbsp whole black peppercorns",
            "1 tbsp flour",
            "1 1/2 cups water",
            "Salt"
        ],
        steps: [
            "Layer lamb pieces and cabbage wedges alternately in a large pot, starting and ending with cabbage.",
            "Sprinkle each layer with salt, peppercorns, and a little flour.",
            "Add the water, cover, and bring to a boil.",
            "Reduce heat and simmer gently for about 2 to 2.5 hours, until the lamb is very tender.",
            "Serve hot with boiled potatoes."
        ]
    },
    {
        id: 5,
        slug: "krumkake",
        name: "Krumkake",
        description: "Delicate, thin Norwegian waffle cookies rolled into cones, traditional at Christmas.",
        category: "dessert",
        prepMinute: "15",
        cookMinute: "15",
        ingredient: [
            "1/2 cup butter, melted",
            "1/2 cup sugar",
            "2 large eggs",
            "1/2 cup flour",
            "1/4 tsp ground cardamom",
            "1/4 cup water"
        ],
        steps: [
            "Whisk the melted butter and sugar together until smooth.",
            "Beat in the eggs one at a time.",
            "Fold in the flour and cardamom, then thin the batter with water until smooth.",
            "Heat a krumkake iron and spoon a small amount of batter onto the center.",
            "Close the iron and cook for about 30-45 seconds until golden.",
            "Quickly roll the hot cookie around a cone-shaped mold and let it cool until crisp."
        ]
    },
    {
        id: 6,
        slug: "fiskesuppe",
        name: "Fiskesuppe",
        description: "A creamy Norwegian fish soup, warming and rich with vegetables.",
        category: "soupe",
        prepMinute: "15",
        cookMinute: "30",
        ingredient: [
            "500 g white fish fillets (cod or haddock), cubed",
            "1 onion, diced",
            "2 carrots, sliced",
            "1 leek, sliced",
            "3 tbsp butter",
            "3 tbsp flour",
            "4 cups fish or vegetable stock",
            "1 cup heavy cream",
            "Fresh dill, chopped",
            "Salt and pepper"
        ],
        steps: [
            "Melt the butter in a large pot and sauté the onion, carrots, and leek until soft.",
            "Stir in the flour and cook for 1 minute.",
            "Gradually whisk in the stock, then bring to a simmer until slightly thickened.",
            "Add the fish cubes and simmer gently for 8-10 minutes until just cooked through.",
            "Stir in the cream and heat through without boiling.",
            "Season with salt and pepper, garnish with fresh dill, and serve."
        ]
    },

    // ---------- SWEDEN ----------
    {
        id: 7,
        slug: "kottbullar",
        name: "Köttbullar",
        description: "Classic Swedish meatballs served with cream sauce, potatoes, and lingonberry jam.",
        category: "plat",
        prepMinute: "25",
        cookMinute: "20",
        ingredient: [
            "500 g ground beef and pork mix",
            "1/2 cup breadcrumbs",
            "1/4 cup milk",
            "1 small onion, finely chopped",
            "1 egg",
            "Salt and white pepper",
            "2 tbsp butter for frying",
            "2 tbsp flour",
            "2 cups beef stock",
            "1/2 cup heavy cream"
        ],
        steps: [
            "Soak the breadcrumbs in milk for 5 minutes.",
            "Mix the ground meat, soaked breadcrumbs, onion, egg, salt, and pepper until combined.",
            "Shape the mixture into small, even meatballs.",
            "Fry the meatballs in butter until browned on all sides and cooked through; set aside.",
            "In the same pan, whisk flour into the remaining fat to make a roux.",
            "Slowly whisk in the beef stock and cream, simmering until thickened.",
            "Return the meatballs to the sauce and heat through.",
            "Serve with mashed or boiled potatoes and lingonberry jam."
        ]
    },
    {
        id: 8,
        slug: "kanelbullar",
        name: "Kanelbullar",
        description: "Sweden's beloved cinnamon buns, soft and fragrant with cardamom.",
        category: "dessert",
        prepMinute: "30",
        cookMinute: "15",
        ingredient: [
            "500 g flour",
            "25 g fresh yeast",
            "1 cup milk, lukewarm",
            "75 g sugar",
            "1 tsp ground cardamom",
            "75 g butter, softened",
            "1/2 tsp salt",
            "75 g butter, softened (for filling)",
            "50 g sugar (for filling)",
            "2 tbsp cinnamon (for filling)",
            "1 egg, beaten (for brushing)",
            "Pearl sugar for topping"
        ],
        steps: [
            "Dissolve the yeast in lukewarm milk.",
            "Mix in flour, sugar, cardamom, salt, and butter to form a smooth dough.",
            "Knead the dough for about 10 minutes, then let it rise for 1 hour until doubled.",
            "Roll the dough into a large rectangle.",
            "Spread the softened butter over the dough, then sprinkle with sugar and cinnamon.",
            "Roll the dough up tightly and cut into slices.",
            "Place the buns on a baking tray, cover, and let rise for 30 minutes.",
            "Brush with beaten egg and sprinkle with pearl sugar.",
            "Bake at 425°F (220°C) for 8-10 minutes until golden brown."
        ]
    },
    {
        id: 9,
        slug: "toast-skagen",
        name: "Toast Skagen",
        description: "A luxurious Swedish appetizer of creamy shrimp salad on toasted bread.",
        category: "entrée",
        prepMinute: "15",
        cookMinute: "5",
        ingredient: [
            "400 g cooked, peeled shrimp, chopped",
            "1/2 cup mayonnaise",
            "2 tbsp sour cream",
            "1 tbsp fresh dill, chopped",
            "1 tbsp lemon juice",
            "4 slices bread, toasted",
            "Salt and pepper",
            "Fish roe and lemon wedges, for garnish"
        ],
        steps: [
            "Mix the shrimp with mayonnaise, sour cream, dill, and lemon juice.",
            "Season with salt and pepper to taste.",
            "Toast the bread slices until golden and crisp.",
            "Spoon the shrimp mixture generously onto each slice of toast.",
            "Garnish with a small spoonful of fish roe and a lemon wedge.",
            "Serve immediately as an appetizer."
        ]
    }
];

export default recipes;