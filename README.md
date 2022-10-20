Demonstração de alguma informação sobre países

## Execução do projeto

no terminal
#### `npm start` 
##### ou
#### `npm run build`
#### `npm install -g serve`
#### `serve -s build`
##### ou 


## Tecnologias utilizadas

### `React 16.10.2`
Packages principais utilizados em react:

#### `npm i react-router-dom`
#### `npm i axios`
#### `npm i array-sort`
#### `npm i gulp gulp-clean-css gulp-rename gulp-sass`

## Necessidade de cada tecnologias

### react-router-dom

##### - Principal utilização para distinção de rotas na aplicação e definição dos componentes dependo da rota do url

### axios

##### - Pedidos à API utilizada e gestão dos mesmo (substituindo o 'fetch')

### array-sort

##### - Ordenar o array dos dados provenientes da API consoante a necessidade de pesquisa (sort)

### gulp

##### - Compilar Sass para css em real time

## Melhorias 

### CSS

##### - Melhorar a interação com as janelas modais em dispositivos móveis (dificuldade na visualização das imagens nestes dispositivos);

##### - Repensar escolha de cores;

##### - Melhorar aspetos visuais gerais;

### Gerais

##### - Pensando na escalabilidade da aplicação uma melhoria a apontar seria a utilização de uma storage (redux) de forma a evitar tantas chamadas à API;

##### - Realização de uma paginação de forma a evitar o scrolling tão extenso;

##### - Rever erros de eslint