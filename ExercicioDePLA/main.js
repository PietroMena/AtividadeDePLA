// Gera as duas grades (A e B) com base nas dimensões informadas
function gerarGrades() {
    const linhas = Number(document.getElementById('qtdLinhas').value);
    const colunas = Number(document.getElementById('qtdColunas').value);

    estiloGrade('gradeA', linhas, colunas);
    estiloGrade('gradeB', linhas, colunas);
}

// Cria a grade de inputs dentro de um container
function estiloGrade(idDiv, linhas, colunas) {
    const container = document.getElementById(idDiv);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    container.className = 'grade';

    for (let i = 0; i < linhas * colunas; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = 0;
        input.className = `celula-${idDiv}`;
        container.appendChild(input);
    }
}

// Lê os inputs de uma grade e devolve uma matriz 2D
function obterMatrizDaTabela(idDiv) {
    const linhas = Number(document.getElementById('qtdLinhas').value);
    const colunas = Number(document.getElementById('qtdColunas').value);
    const inputs = document.querySelectorAll(`.celula-${idDiv}`);

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

// Verifica se duas matrizes têm as mesmas dimensões
function dimensoesIguais(matrizA, matrizB) {
    return (
        matrizA.length === matrizB.length &&
        matrizA[0].length === matrizB[0].length
    );
}

// Soma duas matrizes e retorna a matriz resultado
function somarMatrizes(matrizA, matrizB) {
    if (!dimensoesIguais(matrizA, matrizB)) {
        return 'Erro: as matrizes precisam ter o mesmo tamanho.';
    }

    let matrizResultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        let linhaSoma = [];
        for (let j = 0; j < matrizA[0].length; j++) {
            linhaSoma.push(matrizA[i][j] + matrizB[i][j]);
        }
        matrizResultado.push(linhaSoma);
    }

    return matrizResultado;
}

// Subtrai duas matrizes e retorna a matriz resultado
function subtrairMatrizes(matrizA, matrizB) {
    if (!dimensoesIguais(matrizA, matrizB)) {
        return 'Erro: as matrizes precisam ter o mesmo tamanho.';
    }

    let matrizResultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        let linhaSubtracao = [];
        for (let j = 0; j < matrizA[0].length; j++) {
            linhaSubtracao.push(matrizA[i][j] - matrizB[i][j]);
        }
        matrizResultado.push(linhaSubtracao);
    }

    return matrizResultado;
}

//Função para multiplicar matrizes por escalar
function multiplicarPorEscalar(matriz, escalar) {
    let matrizResultado = [];

    for (let i = 0; i < matriz.length; i++) {
        let linhaMultiplicacao = [];
        for (let j = 0; j < matriz[i].length; j++) {
            linhaMultiplicacao.push(matriz[i][j] * escalar);
        }
        matrizResultado.push(linhaMultiplicacao);
    }
    return matrizResultado;
}

//Função para fazer o Producto de matrizes
function produtoDeMatrizes(matrizA, matrizB) {
    let matrizResultado = [];

    if (matrizA[0].length !== matrizB.length) {
        return 'Erro: o número de colunas da matriz A deve ser igual ao número de linhas da matriz B.';
    }

    for (let i = 0; i < matrizA.length; i++) {
        let linhaProduto = [];

        for (let j = 0; j < matrizB[0].length; j++) {
            let somaProdutos = 0;

            for (let k = 0; k < matrizB.length; k++) {
                somaProdutos += matrizA[i][k] * matrizB[k][j];
            }
            linhaProduto.push(somaProdutos);
        }
        matrizResultado.push(linhaProduto);
    }
    return matrizResultado;
}


// FUNÇÃO PRINCIPAL: Calcula o determinante escolhendo o método pelo tamanho
function calcularDeterminante(matriz) {
    let ordem = matriz.length;

    // CRITÉRIO: Só existe determinante de matriz quadrada!
    if (ordem !== matriz[0].length) {
        return "Erro: A matriz precisa ser quadrada para calcular o determinante.";
    }

    if (ordem === 1) {
        return matriz[0][0];
    }
    if (ordem === 2) {
        return calcularSarrus2x2(matriz);
    }
    if (ordem === 3) {
        return calcularSarrus3x3(matriz);
    }
    if (ordem >= 4) {
        return calcularLaplace(matriz);
    }
}

// 1. SARRUS 2x2: (Diagonal Principal) - (Diagonal Secundária)
function calcularSarrus2x2(m) {
    return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
}

// 2. SARRUS 3x3: Cruzamento clássico de diagonais
function calcularSarrus3x3(m) {
    let principal = (m[0][0] * m[1][1] * m[2][2]) + 
                    (m[0][1] * m[1][2] * m[2][0]) + 
                    (m[0][2] * m[1][0] * m[2][1]);

    let secundaria = (m[0][2] * m[1][1] * m[2][0]) + 
                     (m[0][0] * m[1][2] * m[2][1]) + 
                     (m[0][1] * m[1][0] * m[2][2]);

    return principal - secundaria;
}

// 3. LAPLACE: Para matrizes 4x4 ou maiores (Usa recursão)
function calcularLaplace(m) {
    let ordem = m.length;
    

    if (ordem === 3) return calcularSarrus3x3(m);

    let det = 0;

    // Vamos fixar a primeira linha (i = 0) para calcular os cofatores
    for (let j = 0; j < ordem; j++) {
        let elemento = m[0][j];
        
        // Se o elemento for zero, nem precisa calcular a submatriz (ganha velocidade!)
        if (elemento === 0) continue;

        // Cria a submatriz cortando a linha 0 e a coluna j
        let submatriz = [];
        for (let i = 1; i < ordem; i++) {
            let novaLinha = m[i].filter((_, colIndex) => colIndex !== j);
            submatriz.push(novaLinha);
        }

        // Calcula o sinal do cofator: se (linha + coluna) for ímpar, inverte o sinal
        let sinal = (j % 2 === 0) ? 1 : -1;

        // O Teorema de Laplace diz: det = soma de (elemento * sinal * determinante da submatriz)
        det += elemento * sinal * calcularDeterminante(submatriz);
    }

    return det;
}

//Função para resolver sistema Gauss
function resolverSistemaGauss(matrizAmpliada) {
    let n = matrizAmpliada.length; 
    let m = matrizAmpliada[0].length; 

    let M = matrizAmpliada.map(linha => [...linha]);

    for (let i = 0; i < n; i++) {
        let pivo = M[i][i];

        if (Math.abs(pivo) < 1e-9) {
            let trocou = false;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(M[k][i]) > 1e-9) {
                    let temp = M[i];
                    M[i] = M[k];
                    M[k] = temp;
                    pivo = M[i][i];
                    trocou = true;
                    break;
                }
            }
            if (!trocou) continue;
        }

        for (let k = i + 1; k < n; k++) {
            let fator = M[k][i] / pivo;
            for (let j = i; j < m; j++) {
                M[k][j] -= fator * M[i][j];
            }
        }
    }

    let tipoSistema = "SPD"; 

    for (let i = n - 1; i >= 0; i--) {
        let somaCoeficientes = 0;
        for (let j = 0; j < m - 1; j++) {
            if (Math.abs(M[i][j]) > 1e-9) somaCoeficientes++;
        }
        
        let termoIndependente = M[i][m - 1];

        if (somaCoeficientes === 0 && Math.abs(termoIndependente) > 1e-9) {
            return { tipo: "SI", mensagem: "Sistema Incompatível (Não tem solução).", solucoes: null };
        }
        
        if (somaCoeficientes === 0 && Math.abs(termoIndependente) < 1e-9) {
            tipoSistema = "SPI"; 
        }
    }

    if (n < (m - 1)) {
        tipoSistema = "SPI";
    }

    if (tipoSistema === "SPI") {
        return { tipo: "SPI", mensagem: "Sistema Possível e Indeterminado (Infinitas soluções).", solucoes: null };
    }

    let x = new Array(m - 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let soma = 0;
        for (let j = i + 1; j < m - 1; j++) {
            soma += M[i][j] * x[j];
        }
        x[i] = (M[i][m - 1] - soma) / M[i][i];
    }

    let solucoesFormatadas = x.map(val => Number(val.toFixed(4)));

    return { tipo: "SPD", mensagem: "Sistema Possível e Determinado.", solucoes: solucoesFormatadas };
}

function mostrarResultado(titulo, conteudo) {
    const painel = document.getElementById('painelResultado');
    painel.innerHTML = `
        <div class="resultado-titulo">${titulo}</div>
        <div class="resultado-conteudo">${conteudo}</div>
    `;
}

function matrizParaHtml(matriz) {
    if (typeof matriz === 'string') {
        return `<p class="mensagem-erro">${matriz}</p>`;
    }

    if (typeof matriz === 'number') {
        return `<p class="resultado-numero">${matriz}</p>`;
    }

    return `
        <div class="matriz-display">
            ${matriz.map(linha => `
                <div class="matriz-linha">
                    ${linha.map(valor => `<span class="matriz-celula">${Number.isFinite(valor) ? valor.toFixed(2).replace(/\.00$/, '') : valor}</span>`).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function executarSoma() {
    const matrizA = obterMatrizDaTabela('gradeA');
    const matrizB = obterMatrizDaTabela('gradeB');
    const resultado = somarMatrizes(matrizA, matrizB);
    mostrarResultado('Soma de A + B', matrizParaHtml(resultado));
}

function executarSubtracao() {
    const matrizA = obterMatrizDaTabela('gradeA');
    const matrizB = obterMatrizDaTabela('gradeB');
    const resultado = subtrairMatrizes(matrizA, matrizB);
    mostrarResultado('Subtração de A - B', matrizParaHtml(resultado));
}

function executarProduto() {
    const matrizA = obterMatrizDaTabela('gradeA');
    const matrizB = obterMatrizDaTabela('gradeB');
    const resultado = produtoDeMatrizes(matrizA, matrizB);
    mostrarResultado('Produto de A × B', matrizParaHtml(resultado));
}

function executarDetA() {
    const matrizA = obterMatrizDaTabela('gradeA');
    mostrarResultado('Determinante de A', matrizParaHtml(calcularDeterminante(matrizA)));
}

function executarDetB() {
    const matrizB = obterMatrizDaTabela('gradeB');
    mostrarResultado('Determinante de B', matrizParaHtml(calcularDeterminante(matrizB)));
}

function executarEscalar() {
    const matrizA = obterMatrizDaTabela('gradeA');
    const escalar = Number(document.getElementById('numEscalar').value) || 0;
    const resultado = multiplicarPorEscalar(matrizA, escalar);
    mostrarResultado(`A × ${escalar}`, matrizParaHtml(resultado));
}

function escalonarMatriz(matriz) {
    const copia = matriz.map(linha => [...linha]);
    const n = copia.length;
    const m = copia[0].length;

    for (let i = 0; i < n; i++) {
        let pivo = i;

        while (pivo < n && Math.abs(copia[pivo][i]) < 1e-9) {
            pivo++;
        }

        if (pivo === n) continue;

        if (pivo !== i) {
            [copia[i], copia[pivo]] = [copia[pivo], copia[i]];
        }

        for (let k = i + 1; k < n; k++) {
            const fator = copia[k][i] / copia[i][i];
            for (let j = i; j < m; j++) {
                copia[k][j] -= fator * copia[i][j];
            }
        }
    }

    return copia;
}

function executarGaussA() {
    const matrizA = obterMatrizDaTabela('gradeA');

    if (matrizA.length !== matrizA[0].length) {
        mostrarResultado('Eliminação de Gauss', matrizParaHtml('A matriz A precisa ser quadrada para aplicar Gauss.'));
        return;
    }

    const escalonada = escalonarMatriz(matrizA);
    mostrarResultado('Matriz escalonada de A', matrizParaHtml(escalonada));
}

gerarGrades();