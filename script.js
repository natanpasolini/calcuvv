function botaoLink(botao) {
    if (botao === 'github') {
        window.open('https://github.com/natanpasolini')
    } else if (botao === 'star') {
        window.open('https://github.com/natanpasolini/calcuvv')
    }
}

function voltarCalcUVV(value) {
    if (value === 'defnotas') {
        document.getElementById('resultados').classList.toggle('hide');
        document.getElementById('defnotas').classList.toggle('hide');
    }
}

function proximoCalcUVV(value) {
    if (value === 'resultados') {
        const eventoIrParaResultados = new Event('irParaResultados')
        document.dispatchEvent(eventoIrParaResultados)
    }
}

document.addEventListener('irParaResultados', () => {
    const nota1Input = document.getElementById('nota1bim');
    const nota2Input = document.getElementById('nota2bim');
    const nota1BIM = Number(nota1Input.value);
    const nota2BIM = Number(nota2Input.value);
    const defNotas = document.getElementById('defnotas');
    const resultados = document.getElementById('resultados');
    let nota1valid = true;
    let nota2valid = true;
    if (nota1BIM === 0 && nota2BIM === 0) {
        alert('Você não digitou nenhum valor')
        return
    }
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
    defNotas.classList.toggle('hide')
    resultados.classList.toggle('hide')
    const eventoMostrarResultados = new Event('mostrandoResultados')
    document.dispatchEvent(eventoMostrarResultados)
})

function slideIn() {
    const keyframes = [
        {transform: 'translateY(-700px)'},
        {transform: 'skewX(0deg)'}
    ];
    const options = {duration: 800, direction: 'normal'}
    const defNotas = document.getElementById('defnotas');
    let def_slide = defNotas.animate(keyframes, options)
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('defnotas').classList.toggle('hide');
    slideIn();
} )

document.addEventListener('mostrandoResultados', () => {
    const notamedsem = document.getElementById('notamedsem');
    const resultnotamedsem = document.getElementById('resultnotamedsem');
    const ssStorageNota1Bimestre = sessionStorage.getItem('nota1Bimestre');
    const ssStorageNota2Bimestre = sessionStorage.getItem('nota2Bimestre');
    let medSemestral = (Number(ssStorageNota1Bimestre) + Number(ssStorageNota2Bimestre)) / 2;
    if (sessionStorage.getItem('fez2Bimestre') === 'true') {
        document.getElementById('notanecpf').style.color = 'black'
        document.getElementById('notanecpf').style.backgroundColor = 'white'
        document.getElementById('descparapassarnapf').innerHTML = 'Na Prova Final';
        document.getElementById('titulomedsem').innerHTML = 'Média Semestral'
        notamedsem.innerHTML = medSemestral.toFixed(1);
        notamedsem.style.color = 'white'
        if (medSemestral < 3) {
            resultnotamedsem.innerHTML = 'Reprovado'
            resultnotamedsem.style.color = 'red'
            notamedsem.style.backgroundColor = 'red'
            document.getElementById('recuperacao').classList.add('hide')
        } else if (medSemestral < 7) {
            resultnotamedsem.innerHTML = 'Recuperação'
            resultnotamedsem.style.color = 'blue'
            notamedsem.style.backgroundColor = 'blue'
            document.getElementById('recuperacao').classList.remove('hide')
        } else {
            resultnotamedsem.innerHTML = 'Aprovado';
            resultnotamedsem.style.color = 'green'
            notamedsem.style.backgroundColor = 'green'
            document.getElementById('recuperacao').classList.add('hide')
        }
        let notaPassarRec = 10 - medSemestral
        document.getElementById('parapassarnapf').classList.remove('hide');
        document.getElementById('notanecpf').innerHTML = notaPassarRec
    } else {
        document.getElementById('titulomedsem').innerHTML = 'Sua nota atual';
        notamedsem.innerHTML = Number(sessionStorage.getItem('nota1Bimestre')).toFixed(1);
        if (Number(ssStorageNota1Bimestre) <= 3) {
            resultnotamedsem.innerHTML = 'Muito Baixo';
            resultnotamedsem.style.color = 'red'
            notamedsem.style.color = 'white';
            notamedsem.style.backgroundColor = 'red';
        } else if (Number(ssStorageNota1Bimestre) < 7) {
            resultnotamedsem.innerHTML = 'Bom';
            resultnotamedsem.style.color = 'blue'
            notamedsem.style.color = 'white';
            notamedsem.style.backgroundColor = 'blue';
        } else if (Number(ssStorageNota1Bimestre) < 10) {
            resultnotamedsem.innerHTML = 'Ótimo!';
            resultnotamedsem.style.color = 'green'
            notamedsem.style.color = 'white';
            notamedsem.style.backgroundColor = 'green';
        } else {
            resultnotamedsem.innerHTML = 'Perfeito!';
            resultnotamedsem.style.color = '#EFBF04'
            notamedsem.style.color = 'white';
            notamedsem.style.backgroundColor = '#EFBF04';
        }
        document.getElementById('recuperacao').classList.remove('hide');
        let notaNecessariaParaFazerFinal = 6 - Number(ssStorageNota1Bimestre)
        if (notaNecessariaParaFazerFinal <= 0) {
            document.getElementById('notanecrec').innerHTML = 0
            document.getElementById('notanecrec').style.backgroundColor = 'green'
            document.getElementById('notanecrec').style.color = 'white'
        } else {
            document.getElementById('notanecrec').innerHTML = notaNecessariaParaFazerFinal.toFixed(1);
            document.getElementById('notanecrec').style.backgroundColor = 'white'
            document.getElementById('notanecrec').style.color = 'black'
        }
        let notaNecessariaNo2Bimestre = 14 - Number(ssStorageNota1Bimestre);
        document.getElementById('notanecpf').innerHTML = notaNecessariaNo2Bimestre.toFixed(1);
        if (notaNecessariaNo2Bimestre > 10) {
            document.getElementById('notanecpf').style.color = 'white'
            document.getElementById('notanecpf').style.backgroundColor = 'red'
        } else {
            document.getElementById('notanecpf').style.color = 'black'
            document.getElementById('notanecpf').style.backgroundColor = 'white'
        }
        document.getElementById('descparapassarnapf').innerHTML = 'No 2º Bimestre';
    }
})

document.getElementById('testecheck').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('nota2bim').removeAttribute('disabled')
        sessionStorage.setItem('fez2Bimestre', true)
        document.getElementById('precisafazerrec').classList.add('hide')
    } else {
        document.getElementById('nota2bim').setAttribute('disabled', 'disabled')
        document.getElementById('nota2bim').value = 0
        document.getElementById('precisafazerrec').classList.remove('hide')
        sessionStorage.setItem('fez2Bimestre', false)
    }
})