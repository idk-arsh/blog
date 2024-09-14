// Fetch the blog ID from the URL
let blogId = decodeURI(location.pathname.split("/").pop());

// Reference to the specific blog document
let docRef = db.collection("blogs").doc(blogId);

// Get the blog document
docRef.get().then((doc) => {
    if (doc.exists) {
        setupBlog(doc.data());
    } else {
        console.error('Document does not exist');
        location.replace("/");
    }
}).catch((error) => {
    console.error('Error getting document:', error);
    location.replace("/");
});

// Setup the blog with data
const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const article = document.querySelector('.article');

    // Clear existing content
    banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML = blogTitle.innerHTML = data.title;
    publish.innerHTML = data.publishedAt;
    article.innerHTML = '';

    // Add the article content
    addArticle(article, data.article);
}

// Add the article content to the element
const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);

    data.forEach(item => {
        // Check for heading
        if (item[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (item[i] == '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount).trim()}</${tag}>`;
        }
        // Check for image format
        else if (item[0] == "!" && item[1] == "[") {
            let separator;

            for (let i = 0; i < item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    separator = i;
                    break;
                }
            }

            let alt = item.slice(2, separator).trim();
            let src = item.slice(separator + 2, item.length - 1).trim();
            ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
        }
        // Default to paragraph
        else {
            ele.innerHTML += `<p>${item.trim()}</p>`;
        }
    });
}
