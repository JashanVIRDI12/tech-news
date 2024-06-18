fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        data.items.forEach(item => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const a = document.createElement('a');

            h2.textContent = item.title;
            a.textContent = 'Read more';
            a.href = item.link;
            a.target = '_blank';

            li.appendChild(h2);

            // Create a temporary div to parse the HTML and extract text without unwanted lines
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description;
            let descriptionText = tempDiv.textContent || tempDiv.innerText || "";

            // Remove unwanted copyright line
            descriptionText = descriptionText.replace(/© 2024 TechCrunch. All rights reserved. For personal use only./g, '');

            li.appendChild(document.createTextNode(descriptionText.trim()));
            li.appendChild(a);
            newsList.appendChild(li);
        });
    });
