FROM mcr.microsoft.com/dotnet/sdk:9.0.301 AS build
WORKDIR /src

COPY App.Api/App.Api.csproj App.Api/
RUN dotnet restore App.Api/App.Api.csproj

COPY App.Api/ App.Api/
RUN dotnet publish App.Api/App.Api.csproj -c Release -o /app --no-restore


FROM mcr.microsoft.com/dotnet/sdk:9.0.301
WORKDIR /app

COPY --from=build /app .

ENTRYPOINT ["dotnet", "App.Api.dll"]