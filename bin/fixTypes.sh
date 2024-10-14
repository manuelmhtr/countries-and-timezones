# sh

# This is a temporary solution to https://github.com/manuelmhtr/countries-and-timezones/issues/38
# The "rollup-plugin-dts" Rollup plugin is not adding a "declare" keyword when exporting the
# "countries" and "timezones" constants.
#
# This script should be removed once the problem has been resolved in the plugin.
sed -i '' 's/^const countries=/declare const countries:/' ./esm/types.d.ts
sed -i '' 's/;const timezones=/;\ndeclare const timezones:/' ./esm/types.d.ts
