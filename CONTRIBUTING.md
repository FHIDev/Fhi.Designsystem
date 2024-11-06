# Hvordan hjelpe til <!-- omit from toc -->

Takk for at du er interessert i å helpe til med å utvikle FHI Designsystem!

Det er mange måter å bidra på, og vi har mange ulike behov som skal ivaretas. Alle bidrag er verdifulle! For å gjøre det enklere har vi noen retningslinjer vi ønsker at du følger, og tips vi håper kan være nyttige.

- [Spørsmål eller problemer](#spørsmål-eller-problemer)
  - [Før du oppretter et issue](#før-du-oppretter-et-issue)
  - [Hvordan opprette et godt beskrevet issue](#hvordan-opprette-et-godt-beskrevet-issue)
  - [Godkjenning av issues](#godkjenning-av-issues)
- [Teste utviklingsmiljøet](#teste-utviklingsmiljøet)
- [Hvordan opprette en "pull request"](#hvordan-opprette-en-pull-request)
  - [Kodestandard](#kodestandard)
  - [Testdekning](#testdekning)
- [Hvordan utvikle en ny komponent](#hvordan-utvikle-en-ny-komponent)
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
2. I høyrekolonnen på issuet, under *Development*, klikk på lenken *Create a branch*. På denne måten vil vår brance-navnestandard automatisk bli fulgt.
3. Følg vår [kodestandard](#kodestandard), og våre krav til [testdekning](#testdekning)
4. Opprett PR med en god beskrivelse av koden du ønsker å få med i `main`

### Kodestandard

### Testdekning

## Hvordan utvikle en ny komponent

1. Opp

1. Implement the component in code following design and spesifications from UX. This implementation should always use design tokens and be fully inline with accessibility guidelines and the web standard. Do not diverge from the web standard unless necessary.
    - Manually test the component and create automated tests as well.
2. Create a storybook for the component with full API coverage, including dynamic actions when appropriate.
    - Add written documentation including the components purpose and example use cases.
3. Review the implementation with UX designer and make adjustments when needed.
4. Create PR, have it reviewed by a developer and UX
5. Squash & Merge the PR.
    - Make sure the squashed commit message follows the correct format for the CD


## Etiske retningslinjer

Vi har [et sett med etiske retningslinjer](CODE_OF_CONDUCT.md). Vennligst følg dem i all interaksjon med teammedlemmer, andre bidragsytere og brukere av FHI Designsystem.

