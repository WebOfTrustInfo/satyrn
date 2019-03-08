import showdown from "showdown";
import "../extensions/ace-editor";
import "../extensions/mailito-email";
import "../extensions/anchor-target";

const converter = new showdown.Converter({extensions: ['aceEditor', 'mailitoEmail', 'anchorTarget']});

export default converter;
