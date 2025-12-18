import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
	...nextCoreWebVitals,
	{
		files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
		rules: {
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],
			"no-tabs": "off",
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
			"react/jsx-indent": "off",
			"react/jsx-indent-props": "off",
		},
	},
	{
		files: ["**/*.{ts,tsx,mts,cts}"],
		rules: {
			"no-undef": "off",
		},
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"no-unused-vars": "off",
		},
	},
];

export default eslintConfig;
