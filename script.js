function botaoLink(botao) {
    if (botao === 'github') {
        window.open('https://github.com/natanpasolini')
    }
}

function test() {
    const nota1Input = document.getElementById('nota1bim');
    const nota2Input = document.getElementById('nota2bim');
    const nota1BIM = Number(nota1Input.value);
    const nota2BIM = Number(nota2Input.value);
    const defNotas = document.getElementById('defnotas');
    const resultados = document.getElementById('resultados');
    let nota1valid = true;
    let nota2valid = true;
    if (nota1BIM < 0 || nota1BIM > 10) {
        nota1valid = false;
        nota1Input.style.color = 'red'
    } else {
        nota1Input.style.color = 'black'
    }
    if (nota2BIM < 0 || nota2BIM > 10) {
        nota2valid = false;
        nota2Input.style.color = 'red'
    } else {
        nota2Input.style.color = 'black'
    }
    if (!nota1valid || !nota2valid) {
        alert('Valor inserido inválido!')
        return
    }
    sessionStorage.setItem('nota1Bimestre', nota1BIM)
    sessionStorage.setItem('nota2Bimestre', nota2BIM)
    defNotas.classList.add('hide')
    resultados.classList.toggle('hide')
    console.log(defNotas)
}

function slideIn() {
    const keyframes = [
        {transform: 'translateX(-700px)'},
        {transform: 'skewX(0deg)'}
    ];
    const options = {duration: 500, direction: 'normal'}
    const defNotas = document.getElementById('defnotas');
    let def_slide = defNotas.animate(keyframes, options)
}

document.addEventListener('DOMContentLoaded', () => {
    slideIn()
} )