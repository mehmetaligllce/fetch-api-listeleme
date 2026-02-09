const postlist = document.querySelector('.post-list');

let arrdata = [];
const func = async () => {
    try {
        const ptr = await fetch('https://jsonplaceholder.typicode.com/posts');
        arrdata = await ptr.json();
    }
    catch (err) {
        console.log(err);
    }

    arrdata.forEach((i) => {
        const postitem = document.createElement('li');
        postitem.classList.add('post-item');
        postitem.dataset.id = i.id;
        postitem.innerHTML = `
                <div class="post-body">
                    <span class="post-id">Post id: ${i.id}</span>
                    <strong class="post-title">${i.title}</strong>
                    <p class="post-content">${i.body.slice(0, 60)}...</p>
                </div>
                <button class="post-button">Read More</button>
    `;
        postlist.appendChild(postitem);
    });
}



func();

postlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('post-button')) {
        const postitem = e.target.closest('.post-item');
        const postid = postitem.dataset.id;
        const data = arrdata.find(i => i.id == postid);


        postitem.querySelector('.post-content').textContent = (e.target.textContent === 'Read More') ? data.body : data.body.slice(0, 60) + '...';
        e.target.textContent = (e.target.textContent === 'Read More') ? 'Read Less' : 'Read More';

    }

});
