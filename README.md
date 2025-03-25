# Receptify – examensprojekt

Det här projektet är en receptsamling med frontend byggd i **Next.js (App Router)** med **TypeScript** och där användaren kan:

- Skapa recept med titel, kategori, portioner och ingredienser.
- Skriva stegvisa instruktioner och koppla dem till ingredienser.
- Justera antal portioner och få mängderna automatiskt uppdaterade.
- Se alla sparade recept och klicka in på detaljerad vy.

## Så kör du projektet lokalt

1. **Klona repot**
2. **Installera beroenden: npm install**
3. **Stå i receptify-frontend och kör npm run dev**

   _Det finns en backend._  
   _Den fungerar inte._  
   _Jag trasslade till det och beslutade mig för att överge den tills vidare,_  
   _för att jag skulle hinna klart med frontend._

Navigera till olika sidor med navigeringen i footern.  
Tyvärr finns det ingen koppling till backend, eftersom backend inte fungerar i dagsläget.  
Därför kan inga data sparas mer än i local storage i den här versionen.  
Login och Registrering har därmed inte heller några funktioner ännu.

**_Nytt recept_** är en fullt fungerande sida där man lägger in namn, kategori och antal portioner,  
samt fortsätter med att lägga in de ingredienser receptet innehåller.  
Ny rad fås genom att klicka på "Lägg till ingrediens" eller genom att man använder tab,  
vilket är en metod som jag varmt förespråkar.  
Raderna kan rensas med kvast-ikonen eller tas bort helt med minustecknet.

När alla ingredienser är inlagda kan man spara dem (i local storage) och sedan  
gå vidare genom att klicka på **_Skapa instruktioner_**

På sidan där man skapar instruktioner skriver man de olika stegen i receptet  
och tanken med denna sidan är att man ska kunna baka in ingredienserna  
i instruktionerna så att användaren slipper scrolla fram och tillbaka för att  
kontrollera ingredienslistan femtielva gånger.  
Ingredienser läggs till i instruktionerna genom att man klickar på dem till vänster.

När detta är klart sparar man, och receptet sparas för närvarande i local storage.  
Det går att lägga till fler recept, och det finns några recept sparade i mockdata för  
att man ska få en bild av hur den färdiga produkten kommer se ut.

Vidare så går det att se en översikt över samtliga recept, och slutmålet är att den  
översikten ska gå att filtrera på kategorier.  
Klickar man på ett recept så kommer man till det specifika receptet och  
då är meningen att man ska befinna sig i matlagningsläget.  
Instruktionsstegen är klickbara för att man ska kunna markera ett steg  
som klart och det ändrar då färg.

Slutligen, så kan man ändra antal portioner om det visar sig att  
tjocka släkten bjuder in sig på köttbullar, och ingredienserna  
ökas då i förhållande till det nya antalet portioner.

## Teknisk översikt frontend

- **Framework:** Next.js (App Router)
- **Språk:** TypeScript
- **UI-bibliotek:** Tailwind CSS
- **State-hantering:** React hooks (useState, useEffect)
- **Persistens:** localStorage
- **Mockdata:** Finns i `/lib/mockRecipes.ts`

## Komponenter

- **PageHeader:** Gemensam toppkomponent
- **PageFooter:** Gemensam bottenkomponent med länkar
- **LoginForm:** Enkel inloggningsformulär (om tillämpligt)
- **Input, Button:** UI-element i `/components/ui/`

## localStorage

Projektet använder `localStorage` för att spara:

- `newRecipeIngredients`: Ingredienser och metadata vid receptskapande
- `savedRecipes`: Slutgiltiga recept efter att instruktioner lagts till

## Funktioner

- Dynamisk anpassning av ingrediensmängder baserat på portioner.
- Textinstruktioner med ingrediens-placeholders (t.ex. `{{0}}`).
- Användaren kan klicka i vilka steg som är färdiglagade.
- Responsivt gränssnitt som fungerar på både mobil och desktop.

# BACKEND (ej fungerande)

Men tanken var så här:

## Teknisk översikt backend

- **Runtime: Node.js med TypeScript**
- **API-hantering: AWS API Gateway (REST)**
- **Funktioner: AWS Lambda**
- **Databas: DynamoDB**
- **Autentisering: AWS Cognito (e-postbaserad inloggning)**
- **Middleware: Middy (t.ex. validering, JWT-autentisering)**
- **Säkerhet: JWT, API-nycklar, Content Security Policy**
- **Utveckling: Serverless Framework**

## funktioner

- **Autentisering med Cognito och JWT**
- **POST-endpoints för att spara recept och användare**
- **PUT-endpoints för att redigera recept och användare**
- **GET-endpoints för att hämta recept (alla eller specifika)**
- **DELETE-endpoints för att ta bort recept**
- **Skyddade endpoints (t.ex. endast inloggade användare kan skapa recept)**
- **Datamodell med userId kopplat till varje recept**
