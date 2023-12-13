const cardBaket = document.querySelectorAll('.wallet-card');
const btnWallet = document.querySelector('.btn-wallet');
const btnSell = document.querySelector('.btn-sell');
let walletInput = document.querySelectorAll('.wallet-input');
function cardChange(cardAll) {
    for (let i = 0; i < cardAll.length; i++) {
        cardAll[i].addEventListener('click', () => {
            if (cardAll[i].checked) {
                if (cardAll[i].value === 'alif') {
                    let div = document.createElement('div')
                    let formNode = cardAll[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0];
                    let newHtml = `
                    <div class="d-felx">
                        <input class="form-control wallet-input mb-3" placeholder="Номери Корт" type="number">
                        <img class="img-fluid" src="../img/card-alif.png" alt="">
                    </div>
                    `
                    div.classList.add('card__content');
                    const divDeleteHtml = document.querySelector('.card__content');
                    if (divDeleteHtml !== null) {
                        divDeleteHtml.innerHTML = '';
                        divDeleteHtml.remove()
                    }
                    div.innerHTML = newHtml;
                    formNode.append(div)
                    let updateInput = document.querySelectorAll('.wallet-input');
                    changeWllet(btnWallet, updateInput);
                } else if (cardAll[i].value === 'd-city') {
                    let div = document.createElement('div')
                    let formNode = cardAll[i].parentNode.parentNode.parentNode.parentNode.parentNode.children[0];
                    let newHtml = `
                    <div class="d-felx">
                        <input class="form-control wallet-input mb-3" placeholder="Номери Корт" type="number">
                        <img class="img-fluid" src="../img/d-city.png" alt="">
                    </div>
                    `
                    div.classList.add('card__content');
                    const divDeleteHtml = document.querySelector('.card__content');
                    if (divDeleteHtml !== null) {
                        divDeleteHtml.innerHTML = '';
                        divDeleteHtml.remove()
                    }
                    div.innerHTML = newHtml;
                    formNode.append(div);
                    let updateInput = document.querySelectorAll('.wallet-input');
                    changeWllet(btnWallet, updateInput);
                }
            }
        })
    }

}
function changeWllet(btnWallet, updateInput) {
    btnWallet.addEventListener('click', () => {
        if (updateInput !== undefined) {
            if (updateInput.length >= 3) {
                for (let i = 0; i < updateInput.length; i++) {
                    let newArray = [];
                    newArray.push(updateInput[0].value, updateInput[1].value, updateInput[2].value)
                    let valideInput = newArray.every(e => e !== ''.trim());
                    if (!valideInput) {
                        let updateDiv = document.querySelector('.active-danger')
                        if (updateDiv !== null) {
                            updateDiv.remove()
                        }
                        let div = document.createElement('div');
                        let newHtml = `
                            <div class="alert alert-danger align-self-start" role="alert">
                                Рамзро дуруст <br/> ворид кунед!
                            </div>
                        `
                        console.log(div.classList !== "active-danger");
                        div.classList.add('active-danger')
                        div.innerHTML = newHtml
                        let navModel = document.querySelector('.modal-footer');
                        navModel.prepend(div);
                        return
                    } else {
                        let navInfo = document.querySelector('.nav.nav-pills.gap-2.card-header-pills');
                        let li = document.createElement('li');
                        li.classList.add('nav-item');
                        li.classList.add('text-info');
                        li.classList.add('fw-bold');
                        navInfo.append(li);
                        li.innerText = `Email:> ${updateInput[0].value} Номери Телефон:> ${updateInput[1].value} Номери Корт:> ${updateInput[2].value}`;
                        updateInput[0].value = '';
                        updateInput[1].value = '';
                        updateInput[2].value = '';
                        return
                    }
                }
            }
        }
    })
}
function changeBasket() {
    let getBasket = localStorage.getItem('basket');
    getBasket = JSON.parse(getBasket);
    let btnWalletBaketForm = document.querySelector('.btn.btn-info');
    if (getBasket === null) {
        btnWalletBaketForm.style.display = 'none'
        return
    } else {
        if (getBasket.length === 0) {
            btnWalletBaketForm.style.display = 'none'
        } else {
            btnWalletBaketForm.style.display = 'block'
        }
    }

}
changeBasket();
cardChange(cardBaket);
changeWllet(btnWallet);
btnSell.addEventListener('click', (e) => {
    let valideSell = document.querySelector('.nav-item.text-info.fw-bold')
    if (valideSell) {
        document.querySelector('.card-text.eror').style.color = 'blue';
        document.querySelector('.card-text.eror').style.background = 'none';
        document.querySelector('.card-text.eror').style.padding = '0px';
        alert('Рахмат барои харидатон!!!')
        window.location.reload()
        localStorage.removeItem('basket')
    } else {
        document.querySelector('.card-text.eror').style.color = 'white';
        document.querySelector('.card-text.eror').style.background = 'red';
        document.querySelector('.card-text.eror').style.padding = '5px';
        document.querySelector('.card-text.eror').classList.add('fw-bold');
    }
    e.preventDefault();
})