# Lesson 02 — Componentes reutilizáveis e Props

## Visão geral

Na Lesson 01, você construiu a primeira tela do **Doc AI** usando apenas componentes básicos do React Native.

Agora vamos dar o primeiro passo importante na organização de uma aplicação React:

> dividir a interface em componentes menores e reutilizáveis.

Nesta lição, você vai aprender:

- o que é um componente reutilizável;
- como criar novos arquivos de componente;
- como usar `props`;
- como tipar `props` com TypeScript;
- como importar e exportar componentes;
- como separar responsabilidades entre arquivos;
- como reduzir repetição de código.

Ao final, sua tela inicial continuará parecida com a da Lesson 01, mas estará melhor organizada.

---

# 1. Objetivo da lição

Ao concluir esta lição, você deverá entender:

- por que não devemos deixar tudo dentro de `index.tsx`;
- o que é um componente reutilizável;
- o que são `props`;
- como passar dados de um componente pai para um componente filho;
- como tipar `props` com TypeScript;
- como importar componentes personalizados;
- como criar uma estrutura simples de componentes.

---

# 2. Arquivos que serão usados nesta lição

Nesta lição, vamos trabalhar com estes arquivos:

```text
src/app/index.tsx
src/components/header.tsx
src/components/action-button.tsx
```

A estrutura ficará assim:

```text
src/
├── app/
│   └── index.tsx
│
└── components/
    ├── action-button.tsx
    └── header.tsx
```

---

# 3. Estado atual do projeto

Ao final da Lesson 01, sua tela principal deve estar parecida com:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
    textAlign: 'center',
    fontSize: 16,
  },
});
```

Funciona, mas existe repetição nos dois botões. É exatamente esse tipo de repetição que componentes reutilizáveis ajudam a resolver.

---

# 4. Modelo mental: função Python x componente React

Em Python, imagine:

```python
def criar_botao(texto):
    return f"[ {texto} ]"
```

Você pode reutilizar:

```python
criar_botao("Tirar foto")
criar_botao("Selecionar arquivo")
```

No React Native, podemos fazer algo parecido:

```tsx
<ActionButton label="Tirar foto" />
<ActionButton label="Selecionar arquivo" />
```

O componente é o mesmo. O que muda é o valor passado para ele. Esse valor é uma `prop`.

---

# 5. O que é uma prop?

`Prop` vem de `property` — propriedade.

Uma prop é um dado enviado de um componente pai para um componente filho.

Exemplo:

```tsx
<ActionButton label="Tirar foto" />
```

Aqui:

```tsx
label="Tirar foto"
```

é uma prop.

---

# 6. Componente pai e componente filho

Conceitualmente:

```text
HomeScreen
    ↓
ActionButton
```

`HomeScreen` é o componente pai.

`ActionButton` é o componente filho.

O pai pode enviar dados para o filho usando props.

---

# 7. Primeira refatoração: Header

Hoje temos:

```tsx
<Text style={styles.title}>
  Doc AI
</Text>

<Text style={styles.subtitle}>
  Analise documentos com inteligência artificial
</Text>
```

Vamos transformar isso em:

```tsx
<Header />
```

---

# 8. Ação prática 1 — Criar o componente Header

## Arquivo

Crie:

```text
src/components/header.tsx
```

## Conteúdo

```tsx
import { StyleSheet, Text, View } from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Doc AI
      </Text>

      <Text style={styles.subtitle}>
        Analise documentos com inteligência artificial
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
  },
});
```

---

# 9. Entendendo export

Observe:

```tsx
export function Header() {
```

`export` permite que outro arquivo use esse componente.

Em Python, pense conceitualmente em:

```python
from modulo import funcao
```

No React/TypeScript:

```tsx
import { Header } from '@/components/header';
```

---

# 10. Ação prática 2 — Usar Header na tela principal

## Arquivo

Edite:

```text
src/app/index.tsx
```

## Importação

Adicione:

```tsx
import { Header } from '@/components/header';
```

## Remova

Remova:

```tsx
<Text style={styles.title}>
  Doc AI
</Text>

<Text style={styles.subtitle}>
  Analise documentos com inteligência artificial
</Text>
```

## Adicione

No lugar, coloque:

```tsx
<Header />
```

---

# 11. index.tsx após o Header

Seu arquivo deve ficar parecido com:

```tsx
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Header } from '@/components/header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

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
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },

  button: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
```

Observe que os estilos `title` e `subtitle` saíram de `index.tsx`. Agora pertencem ao `Header`.

---

# 12. Resultado esperado

A tela deve continuar visualmente igual.

Antes:

```text
HomeScreen
├── Text
├── Text
├── Pressable
└── Pressable
```

Agora:

```text
HomeScreen
├── Header
├── Pressable
└── Pressable
```

E internamente:

```text
Header
├── Text
└── Text
```

---

# 13. Segundo componente reutilizável

Agora vamos atacar a repetição dos botões.

Queremos transformar:

```tsx
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
```

em:

```tsx
<ActionButton label="Tirar foto" />
<ActionButton label="Selecionar arquivo" />
```

---

# 14. Ação prática 3 — Criar ActionButton

## Arquivo

Crie:

```text
src/components/action-button.tsx
```

## Conteúdo

```tsx
import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
  label: string;
};

export function ActionButton({ label }: ActionButtonProps) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
```

---

# 15. Entendendo a tipagem

Observe:

```tsx
type ActionButtonProps = {
  label: string;
};
```

Estamos dizendo:

```text
ActionButton recebe uma prop chamada label
e essa prop deve ser uma string
```

Em Python com type hint:

```python
def action_button(label: str):
    ...
```

A ideia é parecida.

---

# 16. Destructuring

Observe:

```tsx
export function ActionButton({ label }: ActionButtonProps)
```

Essa sintaxe:

```tsx
{ label }
```

é chamada de destructuring.

Sem destructuring:

```tsx
export function ActionButton(props: ActionButtonProps) {
  return (
    <Text>{props.label}</Text>
  );
}
```

Com destructuring:

```tsx
export function ActionButton({ label }: ActionButtonProps) {
  return (
    <Text>{label}</Text>
  );
}
```

---

# 17. Usando uma prop na interface

Observe:

```tsx
<Text>
  {label}
</Text>
```

As chaves significam: use o valor TypeScript/JavaScript da variável `label`.

Se chamarmos:

```tsx
<ActionButton label="Tirar foto" />
```

o resultado será:

```text
Tirar foto
```

---

# 18. Ação prática 4 — Usar ActionButton na Home

## Arquivo

Edite:

```text
src/app/index.tsx
```

## Importe

```tsx
import { ActionButton } from '@/components/action-button';
```

## Remova os dois Pressable

Remova os dois blocos com `Pressable`.

## Adicione

```tsx
<ActionButton label="Tirar foto" />
<ActionButton label="Selecionar arquivo" />
```

---

# 19. Limpando imports

Agora `index.tsx` não usa mais:

```tsx
Pressable
Text
```

Então remova-os da importação.

Deixe:

```tsx
import {
  StyleSheet,
  View,
} from 'react-native';
```

---

# 20. Limpando estilos

Os estilos:

```tsx
button
buttonText
```

também não pertencem mais a `index.tsx`.

Remova-os.

---

# 21. index.tsx final

## Arquivo

```text
src/app/index.tsx
```

## Conteúdo

```tsx
import {
  StyleSheet,
  View,
} from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Header } from '@/components/header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ActionButton label="Tirar foto" />

      <ActionButton label="Selecionar arquivo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});
```

---

# 22. Estrutura final

```text
src/
├── app/
│   └── index.tsx
│
└── components/
    ├── action-button.tsx
    └── header.tsx
```

A árvore lógica ficou:

```text
HomeScreen
├── Header
│   ├── Text
│   └── Text
├── ActionButton
│   └── Text
└── ActionButton
    └── Text
```

---

# 23. Por que isso é melhor?

Antes:

```text
index.tsx
├── layout da página
├── título
├── subtítulo
├── estilo do título
├── estilo do subtítulo
├── botão 1
├── botão 2
├── estilo dos botões
└── ...
```

Depois:

```text
index.tsx
└── organiza a tela

header.tsx
└── cuida do cabeçalho

action-button.tsx
└── cuida dos botões
```

Cada componente tem uma responsabilidade mais clara.

---

# 24. DRY

Um princípio comum em desenvolvimento é:

```text
DRY
Don't Repeat Yourself
```

Em português:

> não se repita.

Antes tínhamos duas estruturas quase iguais de botão.

Agora temos uma definição `ActionButton` usada várias vezes.

---

# 25. Props tornam componentes reutilizáveis

Com prop:

```tsx
type ActionButtonProps = {
  label: string;
};
```

podemos usar:

```tsx
<ActionButton label="Tirar foto" />
<ActionButton label="Selecionar arquivo" />
<ActionButton label="Enviar documento" />
<ActionButton label="Cancelar" />
```

---

# 26. O TypeScript protegendo o componente

Definimos:

```tsx
type ActionButtonProps = {
  label: string;
};
```

Então isto é válido:

```tsx
<ActionButton label="Tirar foto" />
```

Mas isto deve gerar erro de TypeScript:

```tsx
<ActionButton label={123} />
```

Porque `123` é número e a prop exige `string`.

---

# 27. Exercício 1 — Criar terceiro botão

No arquivo:

```text
src/app/index.tsx
```

adicione:

```tsx
<ActionButton label="Histórico" />
```

Observe que você não precisou criar novo `Pressable`, novo `Text` ou novo estilo.

Depois, se quiser manter o escopo original do MVP, remova esse terceiro botão.

---

# 28. Exercício 2 — Testar TypeScript

Temporariamente, altere:

```tsx
<ActionButton label="Tirar foto" />
```

para:

```tsx
<ActionButton label={123} />
```

Observe o erro no VS Code.

Depois volte para:

```tsx
<ActionButton label="Tirar foto" />
```

---

# 29. Exercício 3 — Alterar o Header

No arquivo:

```text
src/components/header.tsx
```

altere temporariamente:

```tsx
Doc AI
```

para:

```tsx
Doc AI Mobile
```

Depois volte para:

```tsx
Doc AI
```

---

# 30. Exercício 4 — Ajustar estilo do botão

No arquivo:

```text
src/components/action-button.tsx
```

altere:

```tsx
borderRadius: 8
```

para:

```tsx
borderRadius: 20
```

Observe que todos os botões mudam.

---

# 31. Exercício 5 — Criar uma segunda prop

## Arquivo

```text
src/components/action-button.tsx
```

Altere:

```tsx
type ActionButtonProps = {
  label: string;
};
```

para:

```tsx
type ActionButtonProps = {
  label: string;
  testID?: string;
};
```

O `?` significa que a prop é opcional.

Agora altere:

```tsx
export function ActionButton({ label }: ActionButtonProps)
```

para:

```tsx
export function ActionButton({
  label,
  testID,
}: ActionButtonProps)
```

E:

```tsx
<Pressable style={styles.button}>
```

para:

```tsx
<Pressable
  style={styles.button}
  testID={testID}
>
```

Uso possível:

```tsx
<ActionButton
  label="Tirar foto"
  testID="camera-button"
/>
```

---

# 32. Props obrigatórias x opcionais

Prop obrigatória:

```tsx
type Props = {
  label: string;
};
```

Prop opcional:

```tsx
type Props = {
  label: string;
  testID?: string;
};
```

---

# 33. Fluxo de dados

Um conceito muito importante em React:

```text
Pai
 ↓
props
 ↓
Filho
```

No nosso caso:

```text
HomeScreen
 ↓ label="Tirar foto"
ActionButton
 ↓
Text
```

---

# 34. Comparação com Python

Pense:

```python
def action_button(label: str):
    print(label)
```

Chamadas:

```python
action_button("Tirar foto")
action_button("Selecionar arquivo")
```

No React:

```tsx
<ActionButton label="Tirar foto" />
<ActionButton label="Selecionar arquivo" />
```

---

# 35. Não confundir prop com estado

Nesta lição estamos trabalhando com props.

Props:

```text
dados recebidos do componente pai
```

Estado:

```text
dados que podem mudar durante a vida do componente
```

Estado será assunto da próxima lição.

---

# 36. Por que não usar componentes gigantes?

Separar componentes ajuda a:

- ler;
- testar;
- manter;
- reutilizar;
- evoluir o projeto.

---

# 37. Quando criar um componente?

Bons sinais:

- código repetido;
- parte da tela tem responsabilidade clara;
- bloco visual pode ser reutilizado;
- arquivo está ficando grande;
- parte da interface precisa de lógica própria.

---

# 38. O que ainda NÃO estamos fazendo

Ainda não vamos implementar:

- ação ao clicar nos botões;
- câmera;
- seleção de arquivos;
- navegação;
- FastAPI;
- IA;
- estado com `useState`.

A Lesson 02 é exclusivamente sobre:

```text
componentização + props
```

---

# 39. Checklist da Lesson 02

- [ ] O que é um componente reutilizável?
- [ ] O que é uma prop?
- [ ] Qual a diferença entre componente pai e filho?
- [ ] Como um pai envia dados para um filho?
- [ ] O que significa `label="Tirar foto"`?
- [ ] O que faz `type ActionButtonProps`?
- [ ] Por que `label: string` é importante?
- [ ] O que significa `{ label }`?
- [ ] O que significa `export`?
- [ ] Como importar um componente criado por nós?
- [ ] Por que removemos os estilos dos botões de `index.tsx`?
- [ ] O que é DRY?
- [ ] Qual a diferença inicial entre prop e estado?

---

# 40. Perguntas de revisão

## Pergunta 1

O que acontece aqui?

```tsx
<ActionButton label="Tirar foto" />
```

## Pergunta 2

Quem é o componente pai?

```tsx
export default function HomeScreen() {
  return (
    <View>
      <ActionButton label="Tirar foto" />
    </View>
  );
}
```

## Pergunta 3

O que significa:

```tsx
type ActionButtonProps = {
  label: string;
};
```

## Pergunta 4

Por que isto gera erro?

```tsx
<ActionButton label={10} />
```

## Pergunta 5

Qual a vantagem de reutilizar `ActionButton`?

## Pergunta 6

O que esta linha faz?

```tsx
import { Header } from '@/components/header';
```

---

# 41. Desafio opcional

Crie:

```text
src/components/app-description.tsx
```

Ele deve exibir:

```text
Envie uma foto ou arquivo para começar.
```

Depois importe em:

```text
src/app/index.tsx
```

e coloque entre:

```tsx
<Header />
```

e:

```tsx
<ActionButton label="Tirar foto" />
```

---

# 42. Estrutura esperada ao final

```text
src/
├── app/
│   └── index.tsx
│
└── components/
    ├── action-button.tsx
    └── header.tsx
```

Opcionalmente:

```text
src/components/app-description.tsx
```

---

# 43. Resultado final da Lesson 02

Ao final desta aula, você terá aprendido:

```text
React Native / React
├── Componentes reutilizáveis
├── Props
├── Pai e filho
├── Fluxo de dados
├── Export / Import
├── TypeScript em props
├── Destructuring
└── Separação de responsabilidades
```

---

# 44. Git

Quando a Lesson 02 estiver realmente concluída:

```bash
git status
git add .
git commit -m "refactor: lesson-02 completed"
git push -u origin dev02
depois:::Pull Request
git switch main
git pull origin main
git switch -c dev03

```

Faça `push` quando considerar esse marco pronto para subir.

---

# 45. Próxima lição

A próxima aula será:

```text
Lesson 03 — Estado e eventos
```

Nela, os botões deixarão de ser apenas visuais.

Vamos começar a trabalhar com:

```text
onPress
useState
eventos
mudança de estado
renderização
```

Será a primeira vez em que a interface realmente começará a reagir às ações do usuário.
