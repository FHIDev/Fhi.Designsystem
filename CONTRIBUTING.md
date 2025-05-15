# Hvordan hjelpe til <!-- omit from toc -->

Takk for at du er interessert i å hjelpe til med å utvikle FHI Designsystem!

Det er mange måter å bidra på, og vi har mange ulike behov som skal ivaretas. Alle bidrag er verdifulle! For å gjøre det enklere har vi noen retningslinjer vi ønsker at du følger, og tips vi håper kan være nyttige.

- [Spørsmål eller problemer](#spørsmål-eller-problemer)
  - [Før du oppretter et issue](#før-du-oppretter-et-issue)
  - [Hvordan opprette et godt beskrevet issue](#hvordan-opprette-et-godt-beskrevet-issue)
  - [Godkjenning av issues](#godkjenning-av-issues)
- [Teste utviklingsmiljøet](#teste-utviklingsmiljøet)
- [Hvordan opprette en "pull request"](#hvordan-opprette-en-pull-request)
- [Kodestandard](#kodestandard)
  - [Navngivning](#navngivning)
- [Testdekning](#testdekning)
- [Hvordan utvikle en ny komponent](#hvordan-utvikle-en-ny-komponent)
  - [Før du setter i gang](#før-du-setter-i-gang)
  - [Opprette ny komponent](#opprette-ny-komponent)
  - [Utvikle en ny komponent](#utvikle-en-ny-komponent)
  - [Legg til nytt ikon og ikon-komponent](#legg-til-nytt-ikon-og-ikon-komponent)
  - [Når du er ferdig](#når-du-er-ferdig)
- [Etiske retningslinjer](#etiske-retningslinjer)

## Spørsmål eller problemer

Er du ansatt i Folkehelseinstituttet og har generelle spørsmål, eller tilbakemeldinger kan du [kontakte oss på Teams](https://teams.microsoft.com/l/channel/19%3Aa0d23e5a6954497d9e378d3367e7f458%40thread.skype/General?groupId=571dd359-777d-4c02-85ea-d56854d03ef7).

Har du konkrete forslag til ny funksjonalitet, eller ønsker å rapportere en bug kan du [opprette et issue](https://github.com/FHIDev/Fhi.Designsystem/issues).

### Før du oppretter et issue

- Søk i [issue-listen](https://github.com/FHIDev/Fhi.Designsystem/issues) for å forsikre deg om at det ikke alt finnes et issue som omhandler samme problem, eller samme funksjonalitet.
- Hvis bug-rapport: Sjekk hvilken versjon versjonen av FHI Designsystem som brukes i din applikasjon.

### Hvordan opprette et godt beskrevet issue

Vi har opprettet issue-templates, og bruker du den template-en som passer din forespørsel så finner du alt du trenger av informasjon for å opprette et et godt beskrevet issue.

### Godkjenning av issues

Når et issue opprettes vil det få taggen "Status: Unconfirmed". Denne blir byttet ut med taggen "Status: Confirmed" av en i designsystemteamet hvis issuet blir vurdert til at det skal løses. For å gjøre denne prosessen så enkel som mulig er det viktig at alle issue-er som opprettes er godt beskrevet!

## Teste utviklingsmiljøet

Hvis du ønsker å bidra med kode, eller bare er nysgjerrig; vår ["Kom i gang"](./packages/fhi-designsystem/README.md#kom-i-gang)-guide er uansett stedet å begynne.

## Hvordan opprette en "pull request"

1. Før du oppretter en PR, sørg for at det finnes et issue som omhandler det du skal jobbe med.
2. I høyrekolonnen på issuet, under _Development_, klikk på lenken _Create a branch_. På denne måten vil vår branch-navnestandard automatisk bli fulgt.
3. Følg vår [kodestandard](#kodestandard), og våre krav til [testdekning](#testdekning)
4. Opprett PR med en god beskrivelse av koden du ønsker å få med i `main`
5. Be om review fra [Designsystem-team-developers](https://github.com/orgs/FHIDev/teams/designsystem-team-developers)

## Kodestandard

Linting og prettier tar hånd om det meste, men en ting er viktig å merke seg: all kode skal være på engelsk, bortsett fra domene-ord. For mer informasjon, se [Kodestandard Systemutvikling FHI](https://fhi.visualstudio.com/Fhi.Felles/_wiki/wikis/Fhi.Guidelines.Wiki/4892/kodestandard) (krever tilgang til FHIs Azure DevOps).

### Navngivning

- Bruk camelCase for variabler og funksjoner, og PascalCase for klasser.
- Bruk kebab-case for filnavn og mapper.
- Bruk `fhi-[component-name].component.ts` for komponentfiler.
  - Disse blir automatisk plukket opp av bygget og eksponert i npm-pakken.
- Bruk `fhi-[component-name].stories.ts` for Storybook-filer.
  - Disse blir automatisk plukket opp av Storybook og vist i dokumentasjonen.
- Bruk `fhi-[component-name].test.ts` for testfiler.
  - Disse blir automatisk plukket opp av testverktøyene og kjørt under testing.

## Testdekning

Som et minimum skal API-et til komponenten testes.  
_Mer utfyllende informasjon om testdekning kommer._

## Hvordan utvikle en ny komponent

### Før du setter i gang

For å få opprettet PR og godkjent en ny komponent må den basere seg på en ferdig UX-/designspesifikasjon. Har du et forslag til en komponent som det ikke finnes UX-/designspesifikasjon til, så må du:

1. Forsikre deg om at komponenten, eller en tilsvarende komponent som kan brukes i stede, ikke ligger i [listen over komponenter](https://github.com/FHIDev/Fhi.Designsystem/milestone/1) som allerede er spesifisert, eller som er i ferd med å bli det.
2. Hvis du ikke fant noe under punkt 1. så ta [kontakt på Teams](https://teams.microsoft.com/l/channel/19%3Aa0d23e5a6954497d9e378d3367e7f458%40thread.skype/General?groupId=571dd359-777d-4c02-85ea-d56854d03ef7) for å avklare prosessen videre.

### Opprette ny komponent

1. Opprett en ny mappe under `./packages/fhi-designsystem/src/components/`, med navn `fhi-[new-component]`.
2. Opprett følgende filer i den nye mappen:
   - `fhi-[new-component].stories.ts`
   - `fhi-[new-component].test.ts`
   - `fhi-[new-component].component.ts`
   - `index.ts`
3. Bruk en eksisterende kompononent som eksempel for å få på plass boilerplate i de ulike filene.
   - for VS Code har vi laget snippets for å gjøre det enklere å opprette nye komponenter. Snippet med navn `lit` genererer en komponentmal.
4. For å teste at alt fungerer i Storybook, kjør `pnpm storybook` (Storybook åpnes automatisk i nettleseren).
5. Ev. kan du vise/debugge komponenten i en statisk html-side når du utvikler lokalt. For å gjøre det:
   1. Åpne `./packages/fhi-designsystem/index.html`
   2. Legg til `<script type="module" src="src/components/fhi-[new-component]/fhi-[new-component].component.ts"></script>` i `<head>`.
   3. Legg til din komponent i `<body>` som en vanlig "konsument" av komponenten.
   4. Kjør `pnpm dev` og åpne `http://localhost:5173` i nettleseren.

### Utvikle en ny komponent

1. Implementer komponenten i kode i `fhi-[new-component].component.ts` etter design og spesifikasjoner fra UX. Denne implementeringen bør alltid bruke designtokens, og være helt i tråd med retningslinjer for tilgjengelighet og nettstandarden. Ikke avvik fra nettstandarden med mindre det er nødvendig. Følg også vår [kodestandard](#kodestandard).
2. Legg til automatiserte tester i `fhi-[new-component].test.ts`. Se våre krav til [testdekning](#testdekning).
3. Legg til skriftlig dokumentasjon i `fhi-[new-component].stories.ts`, inkludert komponentenes formål og eksempler på brukstilfeller.
4. Sørg for at alle tester går i grønt, og test også komponenten manuelt.

### Legg til nytt ikon og ikon-komponent

1. Legg til ikonet i `./packages/fhi-designsystem/src/assets/icons/` med filnavn `[new-icon].svg`.
2. kjør `pnpm generate:icons`
   - Dette vil generere en `lit` web-komponent for ikonet i `./packages/fhi-designsystem/src/components/icons/` med navn `fhi-[new-icon].component.ts`.
   - Ikon-komponenten blir behandlet på samme måte som andre komponenter og blir automatisk inkludert i npm- og CDN-byggene.

### Når du er ferdig

1. Gjennomgå implementeringen med UX-designer og foreta justeringer ved behov.
2. Opprett PR med en god beskrivelse av koden du ønsker å få med i `main`
3. Be om review fra [Designsystem-team-developers](https://github.com/orgs/FHIDev/teams/designsystem-team-developers)

## Etiske retningslinjer

Vi har [et sett med etiske retningslinjer](CODE_OF_CONDUCT.md). Vennligst følg dem i all interaksjon med teammedlemmer, andre bidragsytere og brukere av FHI Designsystem.
