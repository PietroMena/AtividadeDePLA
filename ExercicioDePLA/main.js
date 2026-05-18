//FUNÇÃO PARA GERAR AS MATRIZES
function gerarGrades() {
    let linhas = document.getElementById('qtdlinhas').value
    let colunas = document.getElementById('qtdColunas').value

    estiloGrades('gradeA', linhas, colunas)
    estiloGrades('gradeB', linhas, colunas)
}

//FUNÇÃO PARA DEFINIR O TAMANHO DAS MATRIZES
function estiloGrade(idDiv, linhas, colunas) {
    const container = document.getElementById(idDiv);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    container.className = 'grade';

    for (let i = 0; i < linhas * colunas; i++) {
        let input = document.createElement('input');
        input.type = 'number';
        input.value = 0;
        input.className = 'celula-' + idDiv;
        container.appendChild(input);
    }
}

//FUNÇÃO PARA OBTER AS MATRIZES QUE FORAM DIGITADAS
function obterMatrizDaTabea(idDiv) {
    const linhas = document.getElementById('qtdLinhas').value
    const colunas = document.getElementById('qtdColunas').value
    const inputs = document.querySelectorAll(`.celula-${idDiv}`)

    let matriz = [];
    let k = 0;
    for (let i = 0; i < linhas; i++) {
        matriz[i] = [];
        for (let j = 0; j < colunas; j++) {
            matriz[i][j] = Number(inputs[k].value);
            k++;
        }
    }
    return matriz;
}

//FUNÇÃO PARA SOMAR MATRIZES
function somarMatrizes(matrizA, matrizB) {
    let linhas = document.getElementById('qtdlinhas').value
    let colunas = document.getElementById('qtdcolunas').value

    let matrizResultado = []
    if (matrizA.lenght !== matrizB.lenght || matrizA[0].lenght !== matrizB[0].lenght){
        return 'Erro: Tamanhos diferentes';
    }

        for (let i = 0; i < linhas.lenght; i++) {
            let linhaSoma = [];
            for (let j = 0; j < colunas.lenght; j++) {
                linhaSoma.push(matrizA[i][j] + matrizB[i][j])
            }
            matrizResultado.push(linhaSoma)
        }
}
