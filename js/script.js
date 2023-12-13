const textFlower = document.querySelectorAll('#card-text');
const btnVive = document.querySelectorAll('.btn-vive');
const burgerBtn = document.querySelector('.burger__nav');
const basketQuantity = document.querySelector('.nav__basket-item');
const basketAddBtn = document.querySelector('.btn__basket-add');
const btnArrowUp = document.querySelector('.arrow-up');
const inputNumberItems = document.querySelector('.number__items');
const imgResize = document.querySelector('.navbar__logo');
let arrowActive;
const items = [];
let totalPrice = 0;

if (inputNumberItems !== null) {
    inputNumberItems.addEventListener('keydown', () => {
        if (+inputNumberItems.value <= 0) {
            inputNumberItems.value = '';
        }
    })
}
function deleteHide(e) {
    const element = e.target;
    if (element.parentNode.children[1].style.height === "auto") {
        element.parentNode.children[1].style.height = "150px";
        element.parentNode.children[1].style.overflowY = "hidden";
        element.innerText = 'Бештар';
    } else {
        element.parentNode.children[1].style.height = "auto";
        element.parentNode.children[1].style.overflowY = "visible";
        element.innerText = 'Кутох';
    }

}

function setHide(arrElement) {
    if (arrElement != undefined) {
        for (let i = 0; i < arrElement.length; i++) {
            if (arrElement[i].offsetHeight > 150) {
                arrElement[i].style.height = "150px";
                arrElement[i].style.overflowY = "hidden";
                const newHtmlBtn = document.createElement('button');
                arrElement[i].parentNode.append(newHtmlBtn);
                newHtmlBtn.classList.add('btn');
                newHtmlBtn.classList.add('btn-danger');
                newHtmlBtn.classList.add('btn-text');
                newHtmlBtn.innerText = 'Бештар';
                let btnText = document.querySelectorAll('.btn-text');
                for (let x = 0; x < btnText.length; x++) {
                    btnText[x].addEventListener('click', deleteHide)
                }
            }
        }
    }
}

function viveFlower(arrElement) {
    for (let i = 0; i < arrElement.length; i++) {
        arrElement[i].addEventListener('click', (event) => {
            btnArrowUp.classList.remove('active');
            btnArrowUp.classList.add('active');
            const element = event.target;
            element.parentNode.parentNode.classList.remove('active-flower');
            const title = element.parentNode.children[0].innerText;
            const text = element.parentNode.children[1].innerText;
            const src = element.parentNode.parentNode.children[0].attributes[0].nodeValue;
            element.parentNode.parentNode.children[1].style.visibility = 'visible';
            const price = element.parentNode.parentNode.children[1].innerText;

            const mainFlower = document.querySelector('.main-flower');
            const mainFlowerSrc = mainFlower.children[0].lastElementChild.attributes[0].nodeValue;
            const mainFlowerTitle = mainFlower.children[1].children[0].children[1].innerText;
            const mainFlowerText = mainFlower.children[1].children[0].children[2].innerText;
            const mainFlowerPrice = mainFlower.children[1].children[0].children[0].innerText;
            //Замена карточки и главного
            element.parentNode.parentNode.classList.add('active-flower');
            element.parentNode.parentNode.children[0].attributes[0].nodeValue = mainFlowerSrc;
            mainFlower.children[0].lastElementChild.attributes[0].nodeValue = src;
            mainFlower.children[1].children[0].children[1].innerText = title;
            element.parentNode.children[0].innerText = mainFlowerTitle;
            mainFlower.children[1].children[0].children[2].innerText = text;
            element.parentNode.children[1].innerText = mainFlowerText;
            mainFlower.children[1].children[0].children[0].innerText = price;
            element.parentNode.parentNode.children[1].innerText = mainFlowerPrice;
            element.parentNode.parentNode.children[1].style.visibility = 'hidden';
            basketAddBtn.classList.remove('hide');
            inputNumberItems.value = '';
            // arrowActive = document.querySelector('.arrow-up.btn.btn-primary.active')
            event.preventDefault();
        })
    }
}
if (basketAddBtn !== null) {

    basketAddBtn.addEventListener('click', addItemOnBasket)
    function addItemOnBasket(e) {
        let element = e.target;
        if (+inputNumberItems.value == 0 || +inputNumberItems.value == '-') {
            alert('Хохиш менамоем рамзро дуруст ворид кунед!')
            inputNumberItems.value = ''
        } else {
            basketQuantity.classList.toggle('active');
            basketQuantity.classList.add('active');
            let resultQuantity = Number(basketQuantity.innerText)
            resultQuantity = resultQuantity + 1;
            basketQuantity.innerText = +resultQuantity;
            let price = element.parentNode.children[0].innerText;
            //Получаем только цифры регулярное вырожение
            price = price.replace(/\D/g, "")
            const title = element.parentNode.children[1].innerText;
            console.log(price);
            let newItem = {
                price: 0,
                name: '',
                quantity: 0,
            }
            let getBasket = localStorage.getItem('basket');
            getBasket = JSON.parse(getBasket)

            newItem.price = +price;
            newItem.name = title;
            newItem.quantity = +inputNumberItems.value;
            newItem.src = element.parentNode.parentNode.parentNode.children[0].children[0].attributes[0].nodeValue;
            items.push(newItem);
            element.classList.add('hide');
            if (getBasket !== null) {
                getBasket.push(newItem)
                localStorage.setItem('basket', JSON.stringify(getBasket))
            } else {
                localStorage.setItem('basket', JSON.stringify(items));
            }
        }
    }
}

burgerBtn.addEventListener('click', burgerHide)
function burgerHide() {
    burgerBtn.classList.toggle('active');
    document.querySelector('.navbar-nav').classList.toggle('active')
}
//Вывод товаров из localStorage
function updateBsketPage() {
    let getBaket = localStorage.getItem("basket");
    getBaket = JSON.parse(getBaket);
    if (getBaket !== null) {
        for (let i = 0; i < getBaket.length; i++) {
            totalPrice += getBaket[i].quantity * getBaket[i].price
            let newSrc = '';
            if (getBaket[i].src.startsWith('..')) {
                newSrc = getBaket[i].src.replace(/../, '')
            }
            let newHtmlBasket = `
            <div class="card card__basket">
            <img src=" ../${newSrc != '' ? newSrc : getBaket[i].src}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${getBaket[i].name}</h5>
                <p class="card-text fw-bold">${getBaket[i].price}c</p>
                <p class="card-text fw-bold">Микдор: ${getBaket[i].quantity}</p>
                <p class="card-text fw-bold">Хамаги ${getBaket[i].quantity * getBaket[i].price}с</p>
                <a href="#" class="btn btn__basket-item btn-danger">Нест кадан</a>
            </div>
        </div>
            `;
            let div = document.createElement('div');
            let basketItems = document.querySelector('.basket-page__items');
            div.innerHTML = newHtmlBasket
            if (basketItems !== null) {
                basketItems.append(div)
            }
            let totalPriceUpdate = document.querySelector('.nav-link.disabled.fw-bold');
            if (totalPriceUpdate !== null) {
                totalPriceUpdate.innerText = totalPrice + ' Сомони';
            }
        }
    }

}
//_______________//_______________//

updateBsketPage();
const btnsDangerBasket = document.querySelectorAll('.btn__basket-item');
function deleteItemBasket(arrayBtns) {
    for (let i = 0; i < arrayBtns.length; i++) {
        arrayBtns[i].addEventListener('click', (e) => {
            let getBaket = localStorage.getItem('basket');
            getBaket = JSON.parse(getBaket)
            if (getBaket !== null) {
                const element = e.target.parentNode.parentNode;
                element.classList.remove('hide');
                element.classList.add('hide');
                const title = e.target.parentNode.children[0].innerText;
                const quantity = e.target.parentNode.children[2].innerText;
                let totalPriceUpdate = document.querySelector('.nav-link.disabled.fw-bold');
                totalPriceUpdate.innerHTML = totalPriceUpdate.innerHTML.replace(/\D/g, "")
                for (let x = 0; x < getBaket.length; x++) {
                    if (title == getBaket[x].name || quantity == getBaket[x].quantity) {
                        totalPriceUpdate.innerText = +totalPriceUpdate.innerText - getBaket[x].price * getBaket[x].quantity;
                        totalPriceUpdate.innerText = +totalPriceUpdate.innerText + ' сомони'
                        getBaket.splice(x, 1);
                        console.log(getBaket);
                        localStorage.setItem('basket', JSON.stringify(getBaket))
                    }
                }
                changeBasket();
            }
            e.preventDefault()
        })
    }
}
function changeBasket() {
    let getBasket = localStorage.getItem('basket');
    getBasket = JSON.parse(getBasket);
    let btnWalletBaketForm = document.querySelector('.btn.btn-info');
    if (btnWalletBaketForm !== null) {
        if (getBasket !== null) {
            if (getBasket.length === 0) {
                btnWalletBaketForm.style.display = 'none';
            } else {
                btnWalletBaketForm.style.display = 'block';
            }
        }
    }
}
if (btnArrowUp !== null) {
    btnArrowUp.addEventListener('click', swapUp);
    function swapUp() {
        const elementScroll = document.querySelector('.main-flower');
        elementScroll.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.arrow-up.btn.btn-primary.active').classList.remove('active')
    }
}
changeBasket();
deleteItemBasket(btnsDangerBasket)
viveFlower(btnVive);
setHide(textFlower);