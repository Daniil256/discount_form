class Customer {
    constructor(cost, cost__with__discount, discount, quantity__purchased, data__object) {
        this.form = document.querySelector('form')
        this.btn__buy = this.form.querySelector('.btn_buy')
        this.input__name = this.form.querySelector('.name')
        this.input__last__name = this.form.querySelector('.last_name')
        this.block__text = this.form.querySelector('.block_text')
        this.quantity = this.form.querySelector('.quantity')
        this.data = this.form.querySelectorAll('.data')
        this.cost = cost
        this.cost__with__discount = cost__with__discount
        this.discount = discount
        this.data__object = data__object
        this.quantity__purchased = quantity__purchased
    }

    calculation() {
        this.quantity__purchased = 0
        this.cost = 499.99
        this.data__object = {}

        this.block__text.innerHTML = 'Общая стоимость ' + this.cost * this.quantity__purchased + '$'

        this.quantity.innerHTML = 'Добавлено в корзину ' + this.quantity__purchased + ' товаров'
    }

    fillObject() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].value === '') {
                this.block__text.innerHTML = 'Заполните все поля'
                return
            }
        }

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].value !== '') {
                this.data__object[this.data[i].name] = this.data[i].value
            }
        }

        this.quantity__purchased++
        this.quantity.innerHTML = 'Добавлено в корзину ' + this.quantity__purchased + ' товаров'

        if (this.quantity__purchased < 2) {
            this.cost__with__discount = 0
            this.discount = 0
        } else {
            this.cost__with__discount = Number(this.cost - (this.cost * 5 / 100).toFixed(2))
            this.discount = Number((this.cost * 5 / 100).toFixed(2))
        }

        this.data__object['cost'] = (this.cost * this.quantity__purchased).toFixed(2)
        this.data__object['cost__with__discount'] = (this.cost__with__discount * this.quantity__purchased).toFixed(2)
        this.data__object['discount'] = (this.discount * this.quantity__purchased).toFixed(2)
        this.data__object['quantity__purchased'] = this.quantity__purchased

        console.log(this.data__object)
        this.getSale()
    }

    getSale() {
        if (JSON.stringify(this.data__object) !== '{}') {
            if (this.data__object.name === this.input__name.value && this.data__object.last__name === this.input__last__name.value && this.quantity__purchased > 1) {
                this.block__text.innerHTML = 'Старая цена ' + this.data__object['cost'] + '$' + '<br>Цена с учетом скидки ' + this.data__object['cost__with__discount'] + '$' + '<br>Сэкономлено ' + this.data__object['discount'] + '$'
                this.block__text.style.backgroundColor = 'rgb(204, 199, 134)'
            } else if (this.data__object.name !== this.input__name.value || this.data__object.last__name !== this.input__last__name.value) {
                this.block__text.style.backgroundColor = 'rgb(204, 204, 204)'
                this.quantity__purchased = 0
                this.data__object['cost'] = this.cost * this.quantity__purchased
                this.block__text.innerHTML = 'Общая стоимость ' + this.data__object['cost'] + '$' + ' Скидка дается при покупке от 2ух товаров с одного аккаунта'
                this.quantity.innerHTML = 'Добавлено в корзину ' + this.quantity__purchased + ' товаров'
            } else {
                this.block__text.innerHTML = 'Общая стоимость ' + this.data__object['cost'] + '$' + ' Скидка дается при покупке от 2ух товаров с одного аккаунта'
            }
        }
    }
}

const client = new Customer

client.calculation()

if (document.querySelector('.btn_buy')) {
    document.querySelector('.btn_buy').addEventListener('click', function () {
        client.fillObject()
    })
}

if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('keyup', function () {
        client.getSale()
    })
}