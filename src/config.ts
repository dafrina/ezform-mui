export interface FormMuiConfig {
	buttonLabel?: string;
	noFileSelectedText?: string;
	fileSelectedText?: string;
}

const _config: Partial<FormMuiConfig> = {
	buttonLabel: "Select file",
	noFileSelectedText: "No file selected",
	fileSelectedText: "$n file(s) selected",
};

export const EzformMuiConfig = (config?: Partial<FormMuiConfig>): Partial<FormMuiConfig> | void => {
	if (!config) return _config;

	Object.assign(_config, config);
};
