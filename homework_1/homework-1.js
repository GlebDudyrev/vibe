const readline = require('node:readline/promises')


const PRICE_PER_EXTRA_KILOMETER = 25
const MIN_PRICE = 200


function printTicketResult(category, budget) {
    const price = ticketPrice(category)

    if (price === 0) {
        console.log('неизвестная категория')
        return
    } 

    const count = maxTickets(budget, price)

    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)
}


function maxTickets(budget, price) {
    let count = 0
    let totalPrice = 0

    while ((totalPrice + price) <= budget) {
        totalPrice += price
        count += 1
    }

    return count
}


function ticketPrice(category) {
    switch (category) {
        case 1:
            return 300;
        case 2:
            return 500;
        case 3:
            return 900;
        default:
            return 0;
    }
}


function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total)

    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`)
}


function  deliveryPrice(distance, total) {
    if (total >= 3000 || distance <= 3){
        return 0
    }

    if (distance <= 10) {
        return 200
    }
    
    return MIN_PRICE + PRICE_PER_EXTRA_KILOMETER * (distance - 10)
}


function printSteps(height) {
    let totalSteps = 0

    for (let stepNumber = 1; stepNumber <= height; stepNumber++) {
        if (stepNumber === 4) {
            continue
        }

        console.log(`Ступень ${stepNumber}`)
        ++totalSteps

        if (stepNumber === 10) {
            console.log('Дальше лестница не построена')
            break
        }
    }

    console.log(`Всего построено: ${totalSteps}`)
}


async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    console.log('Выберите задачу:')
    console.log('1 – билетная касса')
    console.log('2 – доставка заказа')
    console.log('3 - лестница')

    const action = Number(await rl.question('Ваш выбор: '))

    switch (action) {
    case 1: {
        const ticketCategory = Number(await rl.question('Категория билета: '))
        const budget = Number(await rl.question('Бюджет: '))

        printTicketResult(ticketCategory, budget)
        break
    }
    case 2: {
        const distance = Number(await rl.question('Расстояние: '))
        const orderAmount = Number(await rl.question('Сумма заказа: '))

        printDelivery(distance, orderAmount)
        break
    }
    case 3: {
        const height = Number(await rl.question('Высота лестницы: '))

        printSteps(height)
        break
    }
    default:
        console.log('такой задачи нет')
    }

    rl.close()
}


main()
