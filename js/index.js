const royxat = document.querySelector('.List');
const inputQiymati = document.querySelector('.inputVal');

function foydalanuvchilarniOlish() {
    return fetch('https://jsonplaceholder.typicode.com/users', {})
        .then(response => {
            if (!response.ok) {
                throw new Error('Tarmoq javobi noto‘g‘ri');
            }
            return response.json();
        })
        .catch(error => console.error('Ma’lumotlarni olishda xatolik:', error));
}

function royxatniChopEtish() {
    royxat.innerHTML = ''; // Mavjud ro'yxat elementini tozalash
    return foydalanuvchilarniOlish().then(users => {
        users.forEach(user => {
            let li = document.createElement('li');
            li.innerHTML = user.name;
            royxat.appendChild(li);
        });
    });
}

royxatniChopEtish();

inputQiymati.addEventListener('input', event => {
    const joriyFoydalanuvchi = event.target.value.toLowerCase();
    foydalanuvchilarniOlish()
        .then(users => {
            users = users.filter(user => user.name.toLowerCase().includes(joriyFoydalanuvchi));
            royxat.innerHTML = '';
            
            users.forEach(user => {
                let li = document.createElement("li");
                li.innerHTML = user.name;
                royxat.appendChild(li);
            });
        })
        .catch(error => console.error('Ma’lumotlarni olishda xatolik:', error));
});
