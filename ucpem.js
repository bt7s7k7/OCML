/// <reference path="./.vscode/config.d.ts" />
const { project, github } = require("ucpem")
// @ts-check

const vguiParser = project.prefix("vgui-parser")

vguiParser.prefix("test").use(github("bt7s7k7/TestUtil").res("testUtil"))