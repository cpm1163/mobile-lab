# Lesson 01 — Primeira tela do Doc AI

## Visão geral

Nesta primeira lição, você vai aprender os fundamentos de uma tela em React Native usando TypeScript e Expo.

O foco ainda **não** será câmera, upload, IA ou backend.

O objetivo é entender como uma aplicação React Native organiza a interface e como os principais componentes visuais funcionam.

Ao final da lição, você terá a primeira tela do **Doc AI** executando no celular pelo Expo Go ou no navegador durante os exercícios de interface.

---

# 1. Objetivo da lição

Ao concluir esta lição, você deverá entender:

- o que é um componente;
- o que é JSX/TSX;
- para que servem `View`, `Text`, `Pressable` e `StyleSheet`;
- como uma tela é organizada em uma árvore de componentes;
- como aplicar estilos;
- o que significam propriedades como `flex`, `padding`, `gap` e `justifyContent`;
- como alterar a interface e observar o resultado no Expo Go ou no navegador.

---

# 2. Resultado esperado

Ao final desta lição, o app deverá ter uma tela parecida com:

```text
┌───────────────────────────────┐
│                               │
│            Doc AI             │
│                               │
│ Analise documentos com        │
│ inteligência artificial       │
│                               │
│      [ Tirar foto ]           │
│                               │
│   [ Selecionar arquivo ]      │
│                               │
└───────────────────────────────┘
```

Os botões ainda não terão funcionalidade.

Nesta etapa, eles existirão apenas para aprendermos a estrutura da interface.

---

# 3. Antes de começar

Seu ambiente já deve estar com:

- Node.js e Yarn disponíveis no terminal;
- dependências do projeto instaladas (Expo SDK 57, React Native e TypeScript);
- Expo Go compatível com o SDK do projeto, para testar no celular;
- VS Code aberto no projeto;
- branch de trabalho criada.

Exemplo:

```bash
git branch
```

Resultado esperado:

```text
* dev01
  main
```


### 3.1. Preparar o projeto

No terminal do WSL, entre na pasta do projeto:

```bash
cd ~/projects/mobile-lab
```

Na primeira execução após clonar o repositório, instale as dependências:

```bash
yarn install
```

Não é necessário repetir a instalação a cada aula. Se as dependências já estão instaladas e não mudaram, inicie o Expo diretamente.

### 3.2. Abrir no celular

Para usar o túnel:

```bash
yarn expo start --tunnel
```

Espere o túnel ficar pronto e abra o QR code no celular com o Expo Go. Mantenha o terminal aberto enquanto desenvolve. Use `Ctrl+C` para encerrar antes de trocar o modo de conexão.

O túnel usa o ngrok e depende de acesso à internet. Outra opção é a rede local:

```bash
yarn expo start --lan
```

Nesse caso, computador e celular precisam conseguir se comunicar na rede. No WSL, estar no mesmo Wi-Fi pode não ser suficiente: a configuração de rede e o firewall também influenciam o acesso.

### 3.3. Continuar a lição no navegador

Se o túnel não funcionar, você pode praticar a interface no navegador do computador:

```bash
yarn expo start --localhost --web
```

Se o navegador não abrir automaticamente, acesse o endereço local exibido no terminal. Esse modo usa o servidor local e dispensa o ngrok.

Os exercícios de componentes e estilos desta lição podem ser feitos na web. Depois, confira a tela no celular: o resultado no navegador não substitui a validação em Android ou iOS.

### 3.4. Erro: `failed to start tunnel` / `remote gone away`

Esse erro indica que o túnel não foi estabelecido. Para obter mais detalhes:

```bash
EXPO_DEBUG=1 yarn expo start --tunnel
```

No diagnóstico desta aula:

- `Incorrect dependencies: []` indicou que o Expo não encontrou versões incompatíveis na verificação;
- `Starting Metro Bundler` mostrou o início do Metro;
- o ngrok tentou conectar três vezes e terminou com `remote gone away`.

Isso localiza a falha na abertura do túnel, mas não identifica sozinho a causa da desconexão. Consulte o [status do ngrok](https://status.ngrok.com/), tente novamente e, se persistir, teste outra rede ou desconecte temporariamente a VPN, caso esteja usando.

As mensagens de arquivos `.env` ausentes são informativas; esta tela não precisa deles. O aviso de Android SDK/`ANDROID_HOME` ausente se refere às ferramentas locais do Android e não exige instalar o SDK para usar o Expo Go no celular pelo túnel.

Não há indicação nesse log de que limpar o cache ou reinstalar as dependências resolva o problema. Enquanto investiga a conexão, continue pelo navegador.

Referência: [Expo CLI — conexão e túnel](https://docs.expo.dev/more/expo-cli/#tunneling).

---

# 4. Modelo mental: Python x React Native

Como você já desenvolve em Python, vamos usar algumas analogias.

Em Python, uma função pode retornar um valor:

```python
def saudacao(nome):
    return f"Olá, {nome}"
```

No React Native, um componente também pode ser uma função:

```tsx
function Saudacao() {
  return <Text>Olá</Text>;
}
```

A principal diferença é:

```text
Python
função -> retorna dados

React Native
componente -> retorna interface
```

Essa analogia não é perfeita, mas ajuda bastante no início.

---

# 5. O que é um componente?

Um componente é uma unidade reutilizável da interface.

Por exemplo:

```tsx
function Titulo() {
  return <Text>Doc AI</Text>;
}
```

Esse componente representa um pedaço da tela.

Mais tarde você poderá criar componentes como:

```text
Header
DocumentCard
UploadButton
AnalysisResult
LoadingIndicator
```

Uma aplicação React normalmente é composta por vários componentes menores.

---

# 6. A tela inicial e o Expo Router

Neste projeto, a tela inicial está em `src/app/index.tsx` e seu componente se chama `HomeScreen`:

```tsx
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Doc AI</Text>
    </View>
  );
}
```

`export default` disponibiliza o componente da tela para o Expo Router. O arquivo `index.tsx` define a rota inicial `/`; o nome da função não define o endereço da rota.

A organização relevante para esta aula é:

```text
src/
├── app/
│   ├── _layout.tsx    → layout e organização da navegação
│   └── index.tsx      → tela HomeScreen que vamos editar
└── components/        → componentes reutilizáveis
```

A analogia com uma função Python ajuda a entender que `HomeScreen` é uma função que retorna algo. Aqui, ela retorna a interface de uma tela; a inicialização e a navegação são organizadas pelo Expo Router e pelo layout.

Todos os exemplos práticos desta lição devem ser aplicados em `src/app/index.tsx`. Mantenha o layout existente. Na próxima lição, os componentes extraídos da tela ficarão em `src/components/`.

Referência: [conceitos de rotas do Expo Router](https://docs.expo.dev/router/basics/core-concepts/).

---

# 7. O que é TSX?

Você verá arquivos com extensão:

```text
.tsx
```

TSX significa, de forma simplificada:

> TypeScript com sintaxe para componentes visuais.

Exemplo:

```tsx
const nome = "Carlos";

return (
  <Text>Olá, {nome}</Text>
);
```

Observe:

```tsx
<Text>Olá, {nome}</Text>
```

Isso parece HTML, mas não é HTML.

É JSX/TSX.

---

# 8. JSX/TSX e expressões

Dentro do JSX/TSX, podemos usar JavaScript/TypeScript com chaves.

Exemplo:

```tsx
const nome = "Carlos";

return (
  <Text>Olá, {nome}</Text>
);
```

O resultado será:

```text
Olá, Carlos
```

As chaves:

```tsx
{nome}
```

significam:

> execute ou leia esta expressão JavaScript/TypeScript aqui.

---

# 9. Primeiro componente: View

`View` é um dos componentes fundamentais do React Native.

Pense nele como uma caixa ou container.

Exemplo:

```tsx
<View>
  ...
</View>
```

Ele serve para agrupar outros componentes.

Exemplo:

```tsx
<View>
  <Text>Doc AI</Text>
  <Text>Analise documentos com IA</Text>
</View>
```

Podemos visualizar assim:

```text
View
├── Text
└── Text
```

Para quem conhece HTML, `View` lembra uma `div`.

---

# 10. Segundo componente: Text

Em React Native, textos devem ser exibidos usando `Text`.

Exemplo:

```tsx
<Text>Doc AI</Text>
```

Outro exemplo:

```tsx
<Text>
  Analise documentos com inteligência artificial
</Text>
```

Evite pensar que você pode escrever texto diretamente fora de um componente.

Errado:

```tsx
<View>
  Doc AI
</View>
```

Correto:

```tsx
<View>
  <Text>Doc AI</Text>
</View>
```

---

# 11. Terceiro componente: Pressable

`Pressable` representa uma área que pode receber interação do usuário.

Exemplo:

```tsx
<Pressable>
  <Text>Tirar foto</Text>
</Pressable>
```

A estrutura é:

```text
Pressable
└── Text
```

Mais adiante usaremos:

```tsx
onPress={...}
```

Exemplo futuro:

```tsx
<Pressable onPress={() => console.log("clicou")}>
  <Text>Tirar foto</Text>
</Pressable>
```

Nesta lição ainda não precisamos adicionar comportamento.

---

# 12. Importações

Para usar componentes do React Native, precisamos importá-los.

Exemplo:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
```

A ideia é parecida com Python:

```python
from modulo import ClasseA, ClasseB
```

Em React Native:

```tsx
import { Text, View } from "react-native";
```

---

# 13. Ação prática 1 — Criar a estrutura mínima

Em `src/app/index.tsx`, a estrutura mínima é a seguinte. Se a tela completa já estiver pronta, use estes passos para revisar como ela foi construída:

```tsx
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Doc AI</Text>
    </View>
  );
}
```

Salve o arquivo.

---

# 14. Resultado esperado

No Expo Go ou no navegador, você deve visualizar:

```text
Doc AI
```

Ainda sem estilo.

Se aparecer na tela, sua primeira estrutura React Native está funcionando.

---

# 15. Entendendo a árvore de componentes

O código:

```tsx
<View>
  <Text>Doc AI</Text>
</View>
```

forma esta árvore:

```text
HomeScreen
└── View
    └── Text
```

Agora observe:

```tsx
<View>
  <Text>Doc AI</Text>
  <Text>Analise documentos com IA</Text>
</View>
```

A árvore fica:

```text
HomeScreen
└── View
    ├── Text
    └── Text
```

Essa ideia de árvore é fundamental em React.

---

# 16. Ação prática 2 — Adicionar subtítulo

Altere o código para:

```tsx
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Doc AI</Text>

      <Text>
        Analise documentos com inteligência artificial
      </Text>
    </View>
  );
}
```

Salve e observe o resultado no celular ou no navegador.

---

# 17. Ação prática 3 — Adicionar os botões

Agora adicione `Pressable`.

```tsx
import {
  Pressable,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Doc AI</Text>

      <Text>
        Analise documentos com inteligência artificial
      </Text>

      <Pressable>
        <Text>Tirar foto</Text>
      </Pressable>

      <Pressable>
        <Text>Selecionar arquivo</Text>
      </Pressable>
    </View>
  );
}
```

Neste momento, os elementos já existem, mas visualmente ainda estarão bem simples.

---

# 18. Introdução ao StyleSheet

O React Native possui um recurso chamado:

```tsx
StyleSheet
```

Ele serve para organizar estilos.

Exemplo:

```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
```

E aplicamos o estilo assim:

```tsx
<Text style={styles.title}>
  Doc AI
</Text>
```

---

# 19. Comparação com Python

Este objeto:

```tsx
const styles = {
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
};
```

pode ser mentalmente comparado com:

```python
styles = {
    "title": {
        "fontSize": 32,
        "fontWeight": "bold"
    }
}
```

Não é a mesma linguagem, mas a estrutura é parecida.

---

# 20. Ação prática 4 — Adicionar StyleSheet

Agora altere a importação:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
```

E adicione no final do arquivo:

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
  },

  button: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
```

---

# 21. Aplicando os estilos

Agora aplique os estilos nos componentes.

Código completo:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Doc AI
      </Text>

      <Text style={styles.subtitle}>
        Analise documentos com inteligência artificial
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Tirar foto
        </Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Selecionar arquivo
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
  },

  button: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
```

---

# 22. Entendendo style={styles.container}

Observe:

```tsx
<View style={styles.container}>
```

Isso significa:

```text
use no componente View o estilo chamado container
```

O estilo está definido aqui:

```tsx
container: {
  flex: 1,
  justifyContent: "center",
  padding: 24,
  gap: 16,
}
```

---

# 23. Entendendo flex: 1

Observe:

```tsx
flex: 1
```

De forma simplificada, significa:

> ocupe o espaço disponível.

Isso faz com que o container principal ocupe a tela.

Mais adiante estudaremos Flexbox com mais profundidade.

---

# 24. Entendendo justifyContent

Temos:

```tsx
justifyContent: "center"
```

Por padrão, os elementos em uma `View` são organizados verticalmente.

Imagine:

```text
↓ eixo principal

Texto
Texto
Botão
Botão
```

Com:

```tsx
justifyContent: "center"
```

o grupo fica centralizado verticalmente.

---

# 25. Entendendo padding

Temos:

```tsx
padding: 24
```

`padding` representa espaço interno.

Sem padding:

```text
|Texto
```

Com padding:

```text
|    Texto
```

No nosso caso, evita que os elementos fiquem colados nas bordas da tela.

---

# 26. Entendendo gap

Temos:

```tsx
gap: 16
```

`gap` cria espaço entre os elementos filhos.

Sem `gap`:

```text
Texto
Texto
Botão
Botão
```

Com `gap`:

```text
Texto

Texto

Botão

Botão
```

---

# 27. Entendendo fontSize

Exemplo:

```tsx
fontSize: 32
```

Define o tamanho do texto.

Compare:

```tsx
fontSize: 16
```

com:

```tsx
fontSize: 32
```

---

# 28. Entendendo fontWeight

Exemplo:

```tsx
fontWeight: "bold"
```

Deixa o texto em negrito.

---

# 29. Entendendo borderWidth

Nos botões:

```tsx
borderWidth: 1
```

adiciona uma borda ao componente.

---

# 30. Entendendo borderRadius

```tsx
borderRadius: 8
```

arredonda os cantos do botão.

Quanto maior o valor, mais arredondado.

---

# 31. Entendendo textAlign

No texto do botão:

```tsx
textAlign: "center"
```

centraliza o texto horizontalmente.

---

# 32. Exercício 1 — Alterar fontSize

Altere:

```tsx
fontSize: 32
```

para:

```tsx
fontSize: 40
```

Observe no Expo Go ou no navegador.

Depois volte para:

```tsx
fontSize: 32
```

Objetivo:

> perceber visualmente o efeito de `fontSize`.

---

# 33. Exercício 2 — Alterar padding

Altere:

```tsx
padding: 24
```

para:

```tsx
padding: 40
```

Observe o afastamento das bordas.

Depois volte para:

```tsx
padding: 24
```

---

# 34. Exercício 3 — Remover justifyContent

Remova temporariamente:

```tsx
justifyContent: "center"
```

Observe onde os elementos ficam.

Depois adicione novamente.

Objetivo:

> entender que `justifyContent` está controlando o posicionamento no eixo principal.

---

# 35. Exercício 4 — Alterar gap

Troque:

```tsx
gap: 16
```

por:

```tsx
gap: 32
```

Observe o espaço entre os elementos.

Depois volte para:

```tsx
gap: 16
```

---

# 36. Exercício 5 — Alterar o título

Troque:

```tsx
Doc AI
```

por:

```tsx
Doc AI Mobile
```

Salve e observe.

Depois volte para:

```tsx
Doc AI
```

Objetivo:

> confirmar o ciclo editar -> salvar -> atualizar -> visualizar.

---

# 37. Exercício 6 — Alterar o arredondamento

Troque:

```tsx
borderRadius: 8
```

por:

```tsx
borderRadius: 20
```

Observe o resultado.

Depois escolha o valor que achar mais agradável.

---

# 38. O fluxo de desenvolvimento

Seu ciclo durante o desenvolvimento será aproximadamente:

```text
Editar código
     ↓
Salvar
     ↓
Expo detecta alteração
     ↓
Aplicação atualiza
     ↓
Observar no celular ou navegador
     ↓
Corrigir ou melhorar
```

Esse ciclo rápido é uma das vantagens do Expo durante o aprendizado.

---

# 39. Erros fazem parte do processo

Se você esquecer de importar um componente:

```tsx
<Pressable>
```

mas não importar:

```tsx
Pressable
```

o projeto apresentará erro.

Exemplo correto:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
```

Aprender a ler essas mensagens de erro será uma parte importante do aprendizado.

---

# 40. TypeScript nesta lição

Nesta primeira lição praticamente não estamos usando recursos avançados de TypeScript.

Isso é proposital.

Primeiro vamos aprender React Native.

Depois adicionaremos conceitos de TypeScript conforme forem necessários.

---

# 41. O que ainda NÃO estamos fazendo

Nesta lição não vamos implementar:

- câmera;
- seleção real de arquivos;
- API;
- FastAPI;
- modelo de IA;
- autenticação;
- banco de dados;
- navegação entre telas;
- armazenamento local;
- publicação.

Esses recursos virão gradualmente.

---

# 42. Por que não implementar tudo agora?

Nosso objetivo é separar problemas.

Se fizermos câmera + API + IA + interface ao mesmo tempo, fica difícil saber onde está o erro.

Vamos evoluir assim:

```text
Interface
   ↓
Componentes
   ↓
Estado
   ↓
Eventos
   ↓
Navegação
   ↓
Arquivos
   ↓
Câmera
   ↓
API
   ↓
IA
```

---

# 43. Conceito importante: separação de responsabilidades

Mais adiante, nosso app terá algo parecido com:

```text
React Native
Responsável por:
- interface;
- interação;
- câmera;
- arquivos;
- navegação.

FastAPI
Responsável por:
- API;
- autenticação;
- regras;
- integração com IA.

Modelo de IA
Responsável por:
- classificação;
- resumo;
- extração;
- perguntas sobre documentos.
```

Mas nesta primeira lição estamos trabalhando apenas na camada React Native.

---

# 44. Checklist da Lesson 01

Antes de considerar esta lição concluída, você deve conseguir responder:

- [ ] O que é um componente?
- [ ] Qual arquivo define a tela inicial e o que é `HomeScreen`?
- [ ] Consigo iniciar pelo túnel ou continuar no navegador se ele falhar?
- [ ] Para que serve `View`?
- [ ] Para que serve `Text`?
- [ ] Para que serve `Pressable`?
- [ ] O que é `StyleSheet`?
- [ ] O que significa `style={styles.title}`?
- [ ] O que `flex: 1` faz?
- [ ] O que `justifyContent` controla?
- [ ] O que `padding` representa?
- [ ] O que `gap` representa?
- [ ] O que `fontSize` faz?
- [ ] O que `borderRadius` faz?
- [ ] Consigo visualizar uma árvore de componentes?
- [ ] Consigo alterar o código e visualizar a mudança no Expo Go ou no navegador?

---

# 45. Perguntas de revisão

Tente responder sem consultar a apostila.

### Pergunta 1

O que é um componente em React Native?

### Pergunta 2

Qual a diferença conceitual entre:

```tsx
<View>
```

e:

```tsx
<Text>
```

### Pergunta 3

Por que usamos:

```tsx
<Text>Doc AI</Text>
```

em vez de colocar o texto diretamente dentro de uma `View`?

### Pergunta 4

O que significa:

```tsx
style={styles.button}
```

### Pergunta 5

Qual o efeito de:

```tsx
flex: 1
```

### Pergunta 6

Qual o efeito de:

```tsx
justifyContent: "center"
```

### Pergunta 7

Qual a função do:

```tsx
gap: 16
```

### Pergunta 8

Desenhe mentalmente a árvore deste código:

```tsx
<View>
  <Text>Doc AI</Text>

  <Pressable>
    <Text>Tirar foto</Text>
  </Pressable>
</View>
```

Resposta esperada:

```text
View
├── Text
└── Pressable
    └── Text
```

---

# 46. Desafio opcional

Sem consultar a solução, tente adicionar um terceiro texto abaixo do subtítulo:

```text
Envie uma foto ou arquivo para começar.
```

A estrutura deve ficar parecida com:

```text
Doc AI

Analise documentos com inteligência artificial

Envie uma foto ou arquivo para começar.

[ Tirar foto ]

[ Selecionar arquivo ]
```

Você pode criar um novo estilo chamado:

```tsx
description
```

Exemplo:

```tsx
description: {
  fontSize: 14,
}
```

---

# 47. Quando fazer commit?

Não é necessário fazer commit a cada pequena alteração.

Para este projeto de aprendizado, uma boa regra será:

> commit representa um marco de aprendizado concluído.

Quando a Lesson 01 estiver concluída e funcionando, você pode fazer:

```bash
git status
```

Depois:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: create initial Doc AI screen"
```

E só faça `push` quando fizer sentido subir esse marco para o repositório remoto.

---

# 48. Resultado final da Lesson 01

Ao final desta aula, você terá aprendido:

```text
React Native
├── Componentes
├── TSX
├── View
├── Text
├── Pressable
├── StyleSheet
├── Estrutura em árvore
└── Estilos básicos
```

E terá construído:

```text
Doc AI
├── título
├── descrição
├── botão Tirar foto
└── botão Selecionar arquivo
```

---

# 49. Próxima lição

A próxima etapa será:

```text
Lesson 02 — Componentes reutilizáveis e Props
```

Nela, vamos começar a quebrar nossa tela em partes menores.

Exemplo:

```text
HomeScreen
├── Header
├── ActionButton
└── ActionButton
```

Em vez de deixar tudo dentro do componente `HomeScreen`, criaremos componentes reutilizáveis em `src/components/`.

Essa será uma das primeiras mudanças importantes na forma de pensar em React.
