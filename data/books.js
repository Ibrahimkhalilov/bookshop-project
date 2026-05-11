const booksData = [
    { id: "f1", title: "1984", author: "Джордж Оруэлл", price: 10, oldPrice: 15, rating: 4.8, reviews: 15400, coverImg: "./img/2022-03-26-09-32-261648272746.jpg", filterCategory: "fiction", displayCategory: "Художественная литература", desc: "Культовая антиутопия." },
    { id: "f2", title: "Гордость и предубеждение", author: "Джейн Остин", price: 12, rating: 4.9, reviews: 12200, coverImg: "./img/gordost.jpg", filterCategory: "fiction", displayCategory: "Художественная литература", desc: "Классический английский роман." },
    { id: "f3", title: "Идиот", author: "Федор Достоевский", price: 11, rating: 4.9, reviews: 18100, coverImg: "./img/idiot.jpg", filterCategory: "fiction", displayCategory: "Художественная литература", desc: "Один из самых известных романов русской литературы." },
    { id: "f4", title: "Старик и море", author: "Эрнест Хемингуэй", price: 9, oldPrice: 12, rating: 4.7, reviews: 9300, coverImg: "./img/Oldman_and_the_sea.jpg", filterCategory: "fiction", displayCategory: "Художественная литература", desc: "Повесть, за которую автор получил Нобелевскую премию." },

    { id: "sf1", title: "Возвышение Хоруса", author: "Дэн Абнетт", price: 19, oldPrice: 25, rating: 4.9, reviews: 8400, coverImg: "./img/eres.jpg", filterCategory: "scifi", displayCategory: "Фантастика (WH40k)", desc: "Начало грандиозной саги Ересь Хоруса." },
    { id: "sf2", title: "Наследник Империи (Трилогия Трауна)", author: "Тимоти Зан", price: 17, rating: 4.8, reviews: 6200, coverImg: "./img/traun.jpg", filterCategory: "scifi", displayCategory: "Фантастика (Star Wars)", desc: "Лучшая серия книг по Расширенной вселенной Звездных Войн." },
    { id: "sf3", title: "Скайуокер. Восход (Новеллизация)", author: "Рей Карсон", price: 15, rating: 4.5, reviews: 3100, coverImg: "./img/skywalker.jpg", filterCategory: "scifi", displayCategory: "Фантастика (Star Wars)", desc: "Официальная новеллизация девятого эпизода саги." },

    { id: "k1", title: "Гарри Поттер и философский камень", author: "Дж.К. Роулинг", price: 24, oldPrice: 32, rating: 5.0, reviews: 45100, coverImg: "./img/harry1.jpg", filterCategory: "kids", displayCategory: "Детские книги", desc: "Первая часть истории о мальчике-который-выжил." },
    { id: "k2", title: "Алиса в Стране чудес", author: "Льюис Кэрролл", price: 13, rating: 4.9, reviews: 22000, coverImg: "./img/alis.jpg", filterCategory: "kids", displayCategory: "Детские книги", desc: "Волшебная сказка, любимая детьми и взрослыми." },
    { id: "k3", title: "Винни-Пух и все-все-все", author: "Алан А. Милн", price: 11, rating: 4.8, reviews: 15400, coverImg: "./img/puh.jpg", filterCategory: "kids", displayCategory: "Детские книги", desc: "История о забавном медвежонке." },
    { id: "k4", title: "Сборник сказок", author: "Корней Чуковский", price: 10, oldPrice: 14, rating: 4.9, reviews: 18900, coverImg: "./img/korney.jpg", filterCategory: "kids", displayCategory: "Детские книги", desc: "Мойдодыр, Айболит, Муха-Цокотуха и другие любимые стихи." },

    { id: "p1", title: "Думай медленно, решай быстро", author: "Дэниел Канеман", price: 22, rating: 4.8, reviews: 32100, coverImg: "./img/dumau.jpg", filterCategory: "psychology", displayCategory: "Психология", desc: "Книга о том, как работает наш мозг и почему мы совершаем ошибки." },
    { id: "p2", title: "Тонкое искусство пофигизма", author: "Марк Мэнсон", price: 15, oldPrice: 22, rating: 4.7, reviews: 28900, coverImg: "./img/pogif.jpg", filterCategory: "psychology", displayCategory: "Психология", desc: "Парадоксальный подход к счастливой жизни." },
    { id: "p3", title: "В поисках счастья", author: "Мартин Селигман", price: 16, rating: 4.8, reviews: 12500, coverImg: "./img/v_poiskah.jpg", filterCategory: "psychology", displayCategory: "Психология", desc: "Как получать удовольствие от жизни каждый день." },

    { id: "b1", title: "Принципы", author: "Рэй Далио", price: 30, rating: 4.9, reviews: 18200, coverImg: "./img/printsipi.jpg", filterCategory: "business", displayCategory: "Бизнес и карьера", desc: "Жизненные и рабочие принципы одного из самых успешных инвесторов." },
    { id: "b3", title: "Стив Джобс", author: "Уолтер Айзексон", price: 24, oldPrice: 35, rating: 4.9, reviews: 25000, coverImg: "./img/steve.jpg", filterCategory: "business", displayCategory: "Бизнес и карьера", desc: "Официальная биография создателя Apple." },

    { id: "h1", title: "Sapiens: Краткая история человечества", author: "Юваль Ной Харари", price: 28, oldPrice: 38, rating: 4.9, reviews: 52000, coverImg: "./img/sapiens.jpg", filterCategory: "history", displayCategory: "История", desc: "Как человек разумный покорил планету." },
    { id: "h2", title: "Закат и падение Римской империи", author: "Эдвард Гиббон", price: 42, rating: 4.8, reviews: 8500, coverImg: "./img/rimskaya.jpg", filterCategory: "history", displayCategory: "История", desc: "Фундаментальный труд по истории античности." },
    { id: "h3", title: "Столкновение цивилизаций", author: "Сэмюэл Хантингтон", price: 22, rating: 4.7, reviews: 9100, coverImg: "./img/stolknovenie.jpg", filterCategory: "history", displayCategory: "История", desc: "Политологический трактат о будущем мировом порядке." },

    { id: "ho1", title: "Художник внутри вас", author: "Бетти Эдвардс", price: 17, oldPrice: 24, rating: 4.8, reviews: 6800, coverImg: "./img/hudojn.jpg", filterCategory: "hobby", displayCategory: "Хобби", desc: "Раскройте свой творческий потенциал." },
    { id: "ho2", title: "Думай как математик", author: "Барбара Оакли", price: 15, rating: 4.8, reviews: 14200, coverImg: "./img/dumay_kak_matem.jpg", filterCategory: "hobby", displayCategory: "Обучение", desc: "Как решать любые задачи быстрее и эффективнее." },

    { id: "g1", title: "Атлас мира", author: "National Geographic", price: 70, oldPrice: 95, rating: 5.0, reviews: 2100, coverImg: "./img/atlas.jpg", filterCategory: "gifts", displayCategory: "Подарочное", desc: "Премиальное издание с подробными картами." },

    { id: "it1", title: "Программист-прагматик", author: "Дэвид Томас", price: 36, rating: 4.9, reviews: 34500, coverImg: "./img/programmist.jpg", filterCategory: "it", displayCategory: "IT", desc: "Путь от подмастерья к мастеру." },
    { id: "it2", title: "Алгоритмы: построение и анализ", author: "Томас Кормен", price: 84, oldPrice: 110, rating: 4.9, reviews: 18900, coverImg: "./img/Introduction_to_Algorithms_2nd_Russian_cover.jpg", filterCategory: "it", displayCategory: "IT", desc: "Фундаментальный учебник по алгоритмам." },

    { id: "oc1", title: "1С:Бухгалтерия 8.3 для начинающих", author: "Издательство 1С", price: 19, oldPrice: 28, rating: 4.7, reviews: 14200, coverImg: "./img/1c.png", filterCategory: "1c", displayCategory: "1С", desc: "Базовый курс по работе в системе 1С." },

    { id: "la1", title: "Экономика", author: "Пол Самуэльсон", price: 38, rating: 4.9, reviews: 15200, coverImg: "./img/ekonomika.jpg", filterCategory: "math", displayCategory: "Экономика", desc: "Один из лучших учебников по макро- и микроэкономике." }
];