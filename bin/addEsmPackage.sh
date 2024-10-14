# sh

# Add missing package.json to ./esm folder to enable ESM import
if [[ ! -e ./esm/package.json ]]; then
  echo "{ \"type\": \"module\" }" > ./esm/package.json
fi
