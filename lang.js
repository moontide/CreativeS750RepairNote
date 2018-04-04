function NormalizeLang (lang)
{
	return lang.toLowerCase().replace ("_", "-");
}
function Locale (l)
{
	var arr = l.split (/[_-]/);
	this.lang = arr[0];
	this.region = "";
	if (arr.length > 1)
		this.region = arr[1];
}
// 集合类
function LangSet ()
{
	this.container = {};
	this.put = function (key)
		{
			this.container[key.toLowerCase()] = true;
		}
	this.remove = function (key)
		{
			delete this.container[key.toLowerCase()];
		}
	this.contains = function (key)
		{
			return key.toLowerCase() in this.container;
		}
	this.getCompromisedLanguage = function (l)
	{
		if (this.contains (l))
			return l;

		var ll = new Locale (l);
		var cl = "";
		for (var v in this.container)
		{
			var cll = new Locale (v);
			if (cll.lang == ll.lang)
			{
				cl = v;
				break;
			}
		}
		//alert (l+"折衷的语言是"+cl);
		return cl;
	}
	this.asArray = function () {
		var res = [];
		for (var v in this.container) res.push (v);
		return res;
	}
	this.toString = function () {
		var s = "";
		for (var v in this.container) s = s + v + ",";
		return s;
	}
}

var langset = new LangSet ();

// 从 Element 获取其中包含所有子 Element 的语言集合
function RetrieveLangSet (e, langs)
{
	if (e.hasChildNodes())
	{
		for (var i=0; i<e.childNodes.length; i++)
		{
			if (e.childNodes.item(i).nodeType == 1)	//Node.ELEMENT_NODE)
				RetrieveLangSet (e.childNodes.item(i), langs);
		}
	}
	if (e.lang) langs.put (e.lang);
}

/*
// 设置/更改语言
假设页面内容含有 zh, zh-cn, zh-tw, en 四种语言
- 当 Element 中的 lang 属性为 zh-cn，而要设置的为 zh 时
- 当 Element 中的 lang 属性为 zh，而要设置的为 zh-cn 时
- 设置语言为 zh-hk 怎么处理
- 当要设置的为 es (页面中不存在该语言) 时
*/
var currentLanguage = "";
function SetLang (lang)
{
	SetLang_Unsafe (lang, lang);
}
function SetLang_Unsafe (lang, defaultLang)
{
	var body = document.body;
	if (!body)
		return;

	var caseType  = 0;	// 精确存在
	lang = NormalizeLang (lang);
	defaultLang = NormalizeLang (defaultLang);
	var isLangExists = langset.contains (lang);
	if (!isLangExists)
	{
		var compromisedLanguage = langset.getCompromisedLanguage (lang);
		if (compromisedLanguage != "")
		{
			caseType = 1;	// 折衷方案：假设页面只有 zh-cn，那么设置为 zh-tw zh-hk zh-sg 语言时，会根据 zh 的相同而折衷。
			lang = compromisedLanguage;
		}
		else
		{
			caseType = 2;	// 给定的语言不存在，采用默认值
			lang = defaultLang;
		}
	}
	currentLanguage = lang;
	//alert (lang);
	SetElementTreeVisibleByLang (body, lang, caseType);
}
// 根据 Element 的语言和给定的语言、默认语言，更改 Element 以及所有子 Element 的显示状态
function SetElementTreeVisibleByLang (e, l, caseType)
{
	var display = SetElementVisibleByLang (e, l, caseType);
	if (display<0)	// 隐藏了这个 Element，就不必再去处理子 Element 了
		return;
	if (e.hasChildNodes())
	{
		for (var i=0; i<e.childNodes.length; i++)
		{
			if (e.childNodes.item(i).nodeType == 1)	//Node.ELEMENT_NODE)
				SetElementTreeVisibleByLang (e.childNodes.item(i), l, caseType);
		}
	}
}
// 根据给定的语言，显示或隐藏单个 Element
// 返回值
// >0 显示
// <0 隐藏
// 0 不处理
function SetElementVisibleByLang (e, l, caseType)
{
	if (!e.lang)	// 没有 lang 属性，则不处理
		return 0;

	var display = false;
	//if (caseType==0)
		display = (e.lang==l);
	//else if (caseType==1)
	//	display = (e.lang==l || e.lang.indexOf(l)==0 || l.indexOf(e.lang)==0);
	//else if (caseType==2)
	//	display = (e.lang==l || e.lang.indexOf(l)==0 || l.indexOf(e.lang)==0);

	if (display)
		e.style.display = "";
	else
		e.style.display = "none";

	return display ? 1 : -1;
}

