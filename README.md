# AtividadeDePLA
# Calculadora de Matrizes

Uma aplicação web interativa e responsiva desenvolvida para realizar operações complexas de Álgebra Linear de forma visual e intuitiva. O projeto gera matrize, que vão de acordo com o que o usuário digita e faz os calculos.

---

## Funcionalidades

### 1. Operações Básicas e Aritmética
*   **Soma e Subtração:** Operações elemento a elemento entre duas matrizes de dimensões equivalentes.
*   **Multiplicação de Matrizes:** Multiplicação clássica de linhas por colunas com validação das dimensões.
*   **Multiplicação por Escalar:** Multiplica todos os elementos da Matriz A por um número real constante.

### 2. Cálculo de Determinantes Avançado
O algoritmo analisa a ordem da matriz quadrada e escolhe a abordagem computacional mais performática:
*   **Ordem 1x1, 2x2 e 3x3:** Resolução direta via Regra de Sarrus.
*   **Ordem 4x4 ou superior:** Cálculo automatizado utilizando o **Teorema de Laplace**.

### 3. Resolução de Sistemas Lineares (Método de Gauss)
*   Transforma a matriz em uma matriz ampliada e aplica a **Eliminação de Gauss** (Escalonamento).
*   Faz pivoteamento parcial para evitar divisões por zero.
*   **Classificação Automática do Sistema:** Identifica e retorna se o sistema é um **SPD** (Possível e Determinado, exibindo o vetor solução), **SPI** (Possível e Indeterminado) ou **SI** (Incompatível).

---

## Interface Visual

O design foi construído com foco na experiência do usuário e usabilidade:
*   **Grades Dinâmicas:** Layout construído em *CSS Grid* que se adapta perfeitamente ao tamanho da matriz selecionada ($2\times2$, $3\times3$, $5\times5$, etc.).
*   **Visualização de Resultados:** Área estilizada simulando a notação matemática clássica para a exibição de matrizes resultantes.
*   **Responsividade:** Interface limpa no estilo *Dashboard*, compatível com dispositivos móveis e desktops.

---

## Tecnologias Utilizadas

*   **HTML5:** Estruturação semântica da aplicação.
*   **CSS3:** Design moderno, variáveis nativas, efeitos de foco e *CSS Grid Layout*.
*   **JavaScript (ES6+):** Lógica matemática pura, manipulação dinâmica do DOM, recursividade e clonagem de matrizes para preservação de dados.

---

## Estrutura do Projeto

```text
├── index.html      # Estrutura e marcação dos cards da interface
├── style.css       # Estilização visual e responsividade das grades
└── script.js       # Algoritmos de álgebra linear e manipulação do DOM
