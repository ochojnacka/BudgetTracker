
# BudgetTracker

Prosty system do zarządzania wydatkami, zbudowany w technologii ASP.NET Core i React.

## Technologie

- ASP.NET Core 
- Entity Framework Core
- React
- SQL Server (LocalDB / Express)

## Wymagania

- Visual Studio 
- Node.js + npm
- SQL Server LocalDB (domyślnie) lub SQL Server Express

## Jak uruchomić projekt lokalnie

### 1. Backend (ASP.NET Core)

####  Konfiguracja połączenia

Upewnij się, że w `appsettings.json` masz poprawne ustawienia:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=BudgetTrackerDb;Trusted_Connection=True;"
}
````

> Jeśli używasz SQL Server Express, zamień `Server=(localdb)\\MSSQLLocalDB` na `Server=.\\SQLEXPRESS`

#### Migracje i uruchomienie

```bash
cd BudgetTracker
dotnet restore

# Jeśli nie masz EF CLI:
dotnet tool install --global dotnet-ef

# Utwórz bazę danych z migracji
dotnet ef database update

# Uruchom backend
dotnet run
```

### 2 Frontend (React)

```bash
cd src/budget-tracker-frontend
npm install
npm start
```

## Foldery ignorowane (`.gitignore`)

* `node_modules/`
* `.vs/`
* `bin/`
* `obj/`

## Uwagi

* Aplikacja domyślnie korzysta z lokalnej bazy danych.
