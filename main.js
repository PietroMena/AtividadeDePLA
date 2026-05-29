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

//Função para fazer o Produto de matrizes
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
            return { tipo: "SI", mensagem: "Sistema Incompatível (Não tem solução).", solucoes: null, matrizEscalonada: M };
        }
        
        if (somaCoeficientes === 0 && Math.abs(termoIndependente) < 1e-9) {
            tipoSistema = "SPI"; 
        }
    }

    if (n < (m - 1)) {
        tipoSistema = "SPI";
    }

    if (tipoSistema === "SPI") {
        return { tipo: "SPI", mensagem: "Sistema Possível e Indeterminado (Infinitas soluções).", solucoes: null, matrizEscalonada: M };
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

    return { 
        tipo: "SPD", 
        mensagem: "Sistema Possível e Determinado.", 
        solucoes: solucoesFormatadas,
        matrizEscalonada: M 
    };
}


// Função auxiliar para exibir o HTML estruturado dentro do seu painelResultado
function exibirNoPainel(titulo, conteudoHtml) {
    const painel = document.getElementById('painelResultado');
    if (!painel) return;

    painel.innerHTML = `
        <div class="resultado-titulo">${titulo}</div>
        <div class="resultado-conteudo">${conteudoHtml}</div>
    `;
}

// Converte qualquer matriz para o formato visual de blocos do seu CSS
function criarMatrizHtml(matriz) {
    let html = '<div class="matriz-display">';
    for (let i = 0; i < matriz.length; i++) {
        html += '<div class="matriz-linha">';
        for (let j = 0; j < matriz[i].length; j++) {
            let valorFormatado = Number(matriz[i][j].toFixed(2));
            html += `<span class="matriz-celula">${valorFormatado}</span>`;
        }
        html += '</div>';
    }
    html += '</div>';
    return html;
}

// Execuções dos botões da interface HTML
function executarSoma() {
    let mA = obterMatrizDaTabela('gradeA');
    let mB = obterMatrizDaTabela('gradeB');
    let resultado = somarMatrizes(mA, mB);

    if (typeof resultado === 'string') {
        exibirNoPainel("Erro na Operação", `<span style="color: #e74c3c;">${resultado}</span>`);
    } else {
        exibirNoPainel("Resultado da Soma (A + B)", criarMatrizHtml(resultado));
    }
}

function executarSubtracao() {
    let mA = obterMatrizDaTabela('gradeA');
    let mB = obterMatrizDaTabela('gradeB');
    let resultado = subtrairMatrizes(mA, mB);

    if (typeof resultado === 'string') {
        exibirNoPainel("Erro na Operação", `<span style="color: #e74c3c;">${resultado}</span>`);
    } else {
        exibirNoPainel("Resultado da Subtração (A - B)", criarMatrizHtml(resultado));
    }
}

function executarProduto() {
    let mA = obterMatrizDaTabela('gradeA');
    let mB = obterMatrizDaTabela('gradeB');
    let resultado = produtoDeMatrizes(mA, mB);

    if (typeof resultado === 'string') {
        exibirNoPainel("Erro na Operação", `<span style="color: #e74c3c;">${resultado}</span>`);
    } else {
        exibirNoPainel("Resultado da Multiplicação (A × B)", criarMatrizHtml(resultado));
    }
}

function executarDetA() {
    let mA = obterMatrizDaTabela('gradeA');
    let resultado = calcularDeterminante(mA);

    if (typeof resultado === 'string') {
        exibirNoPainel("Erro no Determinante", `<span style="color: #e74c3c;">${resultado}</span>`);
    } else {
        exibirNoPainel("Determinante de A", `<b style="font-size: 2.2rem; color: #2ecc71;">${Number(resultado.toFixed(4))}</b>`);
    }
}

// Novo gatilho para o botão Det(B)
function executarDetB() {
    let mB = obterMatrizDaTabela('gradeB');
    let resultado = calcularDeterminante(mB);

    if (typeof resultado === 'string') {
        exibirNoPainel("Erro no Determinante", `<span style="color: #e74c3c;">${resultado}</span>`);
    } else {
        exibirNoPainel("Determinante de B", `<b style="font-size: 2.2rem; color: #2ecc71;">${Number(resultado.toFixed(4))}</b>`);
    }
}

function executarEscalar() {
    let mA = obterMatrizDaTabela('gradeA');
    const k = Number(document.getElementById('numEscalar').value);
    let resultado = multiplicarPorEscalar(mA, k);

    exibirNoPainel(`Resultado de A × ${k}`, criarMatrizHtml(resultado));
}

// Gatilho corrigido para o botão "Resolver Gauss (A)" que gera as caixas de X1, X2, X3
function executarGaussA() {
    let mA = obterMatrizDaTabela('gradeA');
    let resposta = resolverSistemaGauss(mA);

    if (resposta.tipo === "ERRO") {
        exibirNoPainel("Erro na Eliminação de Gauss", `<span style="color: #e74c3c;">${resposta.mensagem}</span>`);
        return;
    }

    let htmlMatriz = "<h4>Matriz Escalonada Resultante:</h4>" + criarMatrizHtml(resposta.matrizEscalonada);
    let htmlStatus = `<p style="margin-top: 15px; font-size: 1.1rem;"><b>Classificação:</b> ${resposta.mensagem}</p>`;

    // Monta visualmente os blocos estilizados das incógnitas como na imagem enviada
    if (resposta.tipo === "SPD") {
        let htmlSolucoes = '<div style="margin-top: 15px; display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">';
        resposta.solucoes.forEach((sol, idx) => {
            htmlSolucoes += `<span class="matriz-celula" style="padding: 8px 16px;"><b>X<sub>${idx + 1}</sub></b> = ${sol}</span>`;
        });
        htmlSolucoes += '</div>';
        
        exibirNoPainel("Eliminação de Gauss", htmlMatriz + htmlStatus + htmlSolucoes);
    } else {
        exibirNoPainel("Eliminação de Gauss", htmlMatriz + htmlStatus);
    }
}
