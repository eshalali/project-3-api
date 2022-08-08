const mongoose = require('mongoose')
const Book = require('./book')
const db = require('../../config/db')

const startBooks = [
    {
        title: "Year's Best Fantasy 2",
        author: 'David G. Hartwell, Kathryn Cramer',
        genre: 'Fantasy Fiction',
        description: "Undreamed-Of Wonders From The Farthest Reaches Of Imagination. In this second volume of the previous year's finest short fantastic fiction, acclaimed editor and anthologist David G. Hartwell showcases new works by stellar literary artists -- acknowledged masters of the genre and exceptionally talented newcomers alike. Astonishing worlds come alive in these pages -- realms of strange creatures and remarkable sorceries, as well as twisted shadow versions of our inhabited earthly plain. A bold and breathtaking compendium of tales -- including a new Earthsea story from the incomparable Ursula K. Le Guin -- Years's Best Fantasy 2 is the state-of-the-art of a unique and winning genre, offering unforgettable excursions into new realities wondrous, bizarre, enchanting...and terrifying.",
        imageLink: 'https://m.media-amazon.com/images/P/B000FC1V92.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Spellbreaker',
        author: 'Charlie N. Holmberg',
        genre: 'Science Fiction & Fantasy',
        description: "A world of enchanted injustice needs a disenchanting woman in an all-new fantasy series by the Wall Street Journal bestselling author of The Paper Magician.",
        imageLink: 'https://m.media-amazon.com/images/P/B082HRSZKW.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        genre: 'Mystery, Thriller & Suspense Literary Fiction',
        description: 'For years, rumors of the Marsh Girl have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life—until the unthinkable happens. Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps.',
        imageLink: 'https://m.media-amazon.com/images/P/B078GD3DRG.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'House of Earth and Blood (Crescent City Book 1)',
        author: 'Sarah J. Maas',
        genre: 'Post-Apocalyptic Science Fiction',
        description: "A #1 New York Times bestseller! Sarah J. Maas's brand-new CRESCENT CITY series begins with House of Earth and Blood: the story of half-Fae and half-human Bryce Quinlan as she seeks revenge in a contemporary fantasy world of magic, danger, and searing romance.",
        imageLink: 'https://m.media-amazon.com/images/P/B07QBC8QTP.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The House in the Cerulean Sea',
        author: 'TJ Klune',
        genre: 'Paranormal & Urban Fantasy',
        description: 'The House in the Cerulean Sea is an enchanting love story, masterfully told, about the profound experience of discovering an unlikely family in an unexpected place—and realizing that family is yours.',
        imageLink: '',      
    },
    {
        title: 'Signal Moon: A Short Story',
        author: 'Kate Quinn',
        genre: 'Single Authors Short Stories',
        description: 'From the New York Times bestselling author of The Diamond Eye comes a riveting short story about an impossible connection across two centuries that could make the difference between peace or war.',
        imageLink: 'https://m.media-amazon.com/images/P/B09YRT2KGW.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Rich Blood (Jason Rich Book 1)',
        author: 'Robert Bailey',
        genre: 'Crime Thrillers',
        description: 'From Wall Street Journal bestselling author Robert Bailey comes a compelling legal thriller about a lawyer who takes on his sisters case—and confronts small-town secrets and family skeletons.',
        imageLink: 'https://m.media-amazon.com/images/P/B09DYFQPNX.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Real Bad Things',
        author: 'Kelly J. Ford',
        genre: 'Southern Fiction',
        description: 'From the author of Cottonmouths, a Los Angeles Review Best Book of 2017, comes an evocative suspense about the cost of keeping secrets and the dangers of coming home.',
        imageLink: 'https://m.media-amazon.com/images/P/B09KLL1TKX.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: "Big Chicas Don't Cry",
        author: 'Annette Chavez Macias',
        genre: 'Hispanic American Literature',
        description: 'Four cousins navigate love, loss, and the meaning of family over the course of one memorable year in this heartfelt family drama.',
        imageLink: 'https://m.media-amazon.com/images/P/B09LM3RRSW.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'A Harvest of Secrets: A Novel',
        author: 'Roland Merullo',
        genre: 'Cultural Heritage Fiction',
        description: 'From the bestselling author of From These Broken Streets comes a sweeping novel of love, resistance, and courage set against the backdrop of WWII Italy.',
        imageLink: 'https://m.media-amazon.com/images/P/B09G9YZ4V3.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Exiles',
        author: 'Ashley Saunders',
        genre: 'Cyberpunk Science Fiction',
        description: 'An experiment in survival awaits estranged twin sisters in a thrilling science fiction adventure by the authors of The Rule of One series.',
        imageLink: 'https://m.media-amazon.com/images/P/B09K7JP66H.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'No One Crosses the Wolf: A Memoir',
        author: 'Lisa Nikolidakis',
        genre: 'Memoirs',
        description: 'A powerful memoir about the traumas of a perilous childhood, a shattering murder-suicide, and a healing journey from escape to survival to recovery.',
        imageLink: 'https://m.media-amazon.com/images/P/B09N3P7L6K.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Broken Summer: A Novel',
        author: 'J.M. Lee',
        genre: 'Literary Thriller',
        description: "A death, a lie, a secret. For twenty-six summers he didnt have the courage to face the past.",
        imageLink: 'https://m.media-amazon.com/images/P/B09PBJ813F.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Anni Dreams of Biryani',
        author: 'Namita Moolani Mehra',
        genre: "Children's Diversity & Multicultural",
        description: 'The café across the street from Annis home in Little India makes the best biryani in the world. Fluffy and fragrant, spicy and succulent—Anni could eat it every day. In fact, Anni loves that biryani so much that shes determined to uncover the secret to the recipe. She has so many questions for Uncle, the grumpy chef and owner of the café. But he isnt providing any easy clues. So, with some careful planning, Anni sets out on a mission to find out the secret ingredients to this most special dish. Will Anni get the answers shes looking for…before its too late?',
        imageLink: 'https://m.media-amazon.com/images/P/B09NKNM2BJ.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Lessons in Chemistry: A Novel',
        author: 'Bonnie Garmus',
        genre: 'Humorous Literary Fiction',
        description: 'Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing as an average woman. But its the early 1960s and her all-male team at Hastings Research Institute takes a very unscientific view of equality. Except for one: Calvin Evans; the lonely, brilliant, Nobel–prize nominated grudge-holder who falls in love with—of all things—her mind. True chemistry results. ',
        imageLink: 'https://m.media-amazon.com/images/P/B098PW8NP8.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Sparring Partners: Novellas',
        author: 'John Grisham',
        genre: 'Mystery, Thriller & Suspense',
        description: '#1 NEW YORK TIMES BESTSELLER • John Grisham is the acknowledged master of the legal thriller. In his first collection of novellas, law is a common thread, but Americas favorite storyteller has several surprises in store.',
        imageLink: 'https://m.media-amazon.com/images/P/B09QHKVGCJ.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Thursday Murder Club: A Novel (A Thursday Murder Club Mystery Book 1)',
        author: 'Richard Osman',
        genre: 'Mystery, Thriller & Suspense',
        description: 'Four septuagenarians with a few tricks up their sleeves. A female cop with her first big case. A brutal murder. Welcome to... THE THURSDAY MURDER CLUB',
        imageLink: 'https://m.media-amazon.com/images/P/B084M663VB.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'River of the Gods: Genius, Courage, and Betrayal in the Search for the Source of the Nile',
        author: 'Candice Millard',
        genre: 'Historical African Biographies',
        description: 'NEW YORK TIMES BESTSELLER • The harrowing story of one of the great feats of exploration of all time and its complicated legacy—from the New York Times bestselling author of The River of Doubt and Destiny of the Republic',
        imageLink: 'https://m.media-amazon.com/images/P/B09BTJNJCX.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Lioness: A Novel',
        author: 'Chris Bohjalian',
        genre: 'Historical Thrillers',
        description: 'NEW YORK TIMES BEST SELLER • A luxurious African safari turns deadly for a Hollywood starlet and her entourage in this riveting historical thriller from the New York Times bestselling author of The Flight Attendant.',
        imageLink: 'https://m.media-amazon.com/images/P/B09CDB3DLY.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Nightcrawling: A novel',
        author: 'Leila Mottley',
        genre: 'Black & African American Literary Fiction',
        description: 'BOOKER PRIZE NOMINEE • NEW YORK TIMES BEST SELLER • OPRAHS BOOK CLUB PICK • A dazzling novel about a young Black woman who walks the streets of Oakland and stumbles headlong into the failure of its justice system—the debut of a blazingly original voice and "a soul-searching portrait of survival and hope" (Oprah Winfrey)',
        imageLink: 'https://m.media-amazon.com/images/P/B09DK8M4VL.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living',
        author: 'Ryan Holiday',
        genre: 'From the team that brought you The Obstacle Is the Way and Ego Is the Enemy, a beautiful daily devotional of Stoic meditations—an instant Wall Street Journal and USA Today Bestseller.',
        description: 'Greek & Roman Philosophy',
        imageLink: 'https://m.media-amazon.com/images/P/B01HNJIJB2.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'How to Stop Time: A Novel',
        author: 'Matt Haig',
        genre: 'Science Fiction & Fantasy',
        description: 'From the New York Times bestselling author of The Midnight Library. She smiled a soft, troubled smile and I felt the whole world slipping away, and I wanted to slip with it, to go wherever she was going… I had existed whole years without her, but that was all it had been. An existence. A book with no words.',
        imageLink: 'https://m.media-amazon.com/images/P/B072Q8WX9K.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'How to Change Your Mind: What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence',
        author: 'Michael Pollan',
        genre: 'Pharmacology Pain Medicine',
        description: 'A brilliant and brave investigation into the medical and scientific revolution taking place around psychedelic drugs--and the spellbinding story of his own life-changing psychedelic experiences',
        imageLink: 'https://m.media-amazon.com/images/P/B076GPJXWZ.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Cuban Affair: A Novel',
        author: 'Nelson DeMille',
        genre: 'American Literature',
        description: 'Nelson DeMilles #1 New York Times bestseller, “an action-packed, relentlessly paced thriller” (Publishers Weekly, starred review), featuring DeMilles newest character—U.S. Army combat veteran Daniel “Mac” MacCormick, a charter boat captain setting sail on his most dangerous cruise yet.',
        imageLink: 'https://m.media-amazon.com/images/P/B071R25VXH.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Portrait of an Unknown Woman: A Novel',
        author: 'Daniel Silva',
        genre: 'Thriller & Suspense Action Fiction',
        description: 'In a spellbinding new masterpiece by #1 New York Times bestselling author Daniel Silva, Gabriel Allon undertakes a high-stakes search for the greatest art forger who ever lived',
        imageLink: 'https://m.media-amazon.com/images/P/B09JPBWVMF.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Secrets of Us',
        author: 'Lucinda Berry',
        genre: 'Mystery',
        description: 'Dangerously addictive, The Secrets of Us is a pulse-pounding exploration of a disturbed psyche and the bond between two sisters desperate to escape a troubled past.',
        imageLink: 'https://m.media-amazon.com/images/P/B08FC2LM3W.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Coffin Road: An utterly gripping crime thriller from the author of The China Thrillers',
        author: 'Peter May',
        genre: 'Serial Killer Thrillers',
        description: 'PETER MAY MIXES MURDER, MYSTERY and MEMORY . . . AND MARKS HIS RETURN TO THE OUTER HEBRIDES',
        imageLink: 'https://m.media-amazon.com/images/P/B07TV1N9T7.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Hive',
        author: 'Gregg Olsen',
        genre: 'Mystery, Thriller & Suspense',
        description: 'Glamorous messiah or charlatan? A mask of beauty hides deadly secrets in #1 New York Times and Amazon Charts bestselling author Gregg Olsens mesmerizing novel of suspense.',
        imageLink: 'https://m.media-amazon.com/images/P/B07YKQ289D.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Doorbell Rang (A Nero Wolfe Mystery Book 41)',
        author: 'Rex Stout',
        genre: 'Historical Thrillers',
        description: 'Theres no one and nothing the great detective Nero Wolfe wouldnt take on if the price was right. Thats something wealthy society widow Rachel Bruner is counting on when she writes him a check for a whopping hundred grand. But even Wolfe has a moments doubt when he finds out why the prize is so generous. For the oversize genius and his able assistant Archie Goodwin are about to lock horns with the FBI—and those highly trained G-men have a way with threats, tails, and bugs that could give even sedentary sleuth Nero Wolfe a run for his money.',
        imageLink: 'https://m.media-amazon.com/images/P/B003O86QA8.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'The Spanish Daughter: A Gripping Historical Novel Perfect for Book Clubs',
        author: 'Lorena Hughes',
        genre: 'Historical Caribbean & Latin American Fiction',
        description: 'The Washington Post Books to Read Now | Ms. Magazine Reads for the Rest of Us | Bustle Most Anticipated Books | PopSugar Best Books | BiblioLifestyle Most Anticipated Historical Fiction Books | Book Riot Book Recommendations | Finer Things Book Lover Gifts Theyll Actually Love',
        imageLink: 'https://m.media-amazon.com/images/P/B091MQ9XHN.01._SCLZZZZZZZ_SX500_.jpg',      
    },
    {
        title: 'Invent (The Completionist Chronicles Book 7)',
        author: 'Dakota Krout',
        genre: 'Mage Gaming',
        description: 'Class secrets revealed. A large Shoe to fill. Peace is only on the table.',
        imageLink: 'https://m.media-amazon.com/images/P/B0B347KLTH.01._SCLZZZZZZZ_SX500_.jpg',      
    },
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Book.deleteMany({ owner: null })
            .then(deletedBooks => {
                console.log('deletedBooks', deletedBooks)
                // the next step is to use our startBooks array to create our seeded Books
                Book.create(startBooks)
                    .then(newBooks => {
                        console.log('the new Books', newBooks)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })