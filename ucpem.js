/// <reference path="./.vscode/config.d.ts" />
const { project, github } = require("ucpem")
// @ts-check


const vguiParserProject = project.prefix("vgui-parser")
vguiParserProject.prefix("test").use(github("bt7s7k7/TestUtil").res("testUtil"))
const vguiParser = vguiParserProject.prefix("src").res("vgui-parser")

const vguiDemoProject = project.prefix("vgui-demo")
const vguiDemo = vguiDemoProject.prefix("src").res("vgui-demo", vguiParser)