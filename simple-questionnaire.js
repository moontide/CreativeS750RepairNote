var _questionnaire__CurrentQuestionIndex = -1;
var _questionnaire__Flow = [];

function GetQuestionElementID (index)
{
	return '__Q' + index;
}
function GetQuestionInputElementName (index)
{
	return 'q' + index;
}
function GetQuestionInputElementID (question_index, option_index)
{
	return 'q' + question_index + 'o' + option_index;
}
function GenerateQuestionnaire (questionnaire, e)
{
	var html = e.html ();
	var questions = questionnaire.questions;
	for (var i=0; i<questions.length; i++)
	{
		var q = questions[i];
		var eQ = $('<div>').attr ({id: GetQuestionElementID(i)});
		var divQNumber = $('<span>').attr ({class: 'question-number'});
			divQNumber.append (i+1);
		var divQText = $('<span>').attr ({class: 'question-text'});
			divQText.append (q.q);
		//console.info (q.q);
		var divOptions = $('<div>').attr ({class: 'question-options'});
		var options = q.options;
		//console.info (options.length + ' 个选项');
		for (var j=0; j<options.length; j++)
		{
			var option = options[j];
			//console.info (option.l);
			var divOptionLabel = $('<label>');
			var divOptionInput = $('<input>').attr({type:'radio', name: GetQuestionInputElementName (i), id: GetQuestionInputElementID (i, j), value:option.v});
			divOptionLabel.append (divOptionInput);
			divOptionLabel.append (option.l);
			divOptions.append (divOptionLabel);
			divOptions.append ('<br/>');
		}
		eQ.append (divQNumber);
		eQ.append (divQText);
		eQ.append (divOptions);
		eQ.hide ();
		html += eQ.prop('outerHTML');
	}
	e.html (html);
}

function StartQuestionnaire (questionnaire)
{
	var iFirstQuestionIndex = questionnaire.start;
	_questionnaire__Flow.push (iFirstQuestionIndex);
	//alert (_questionnaire__Flow);
	ShowQuestion (questionnaire, iFirstQuestionIndex);
}

function ShowQuestion (questionnaire, question_index)
{
	$('#' + GetQuestionElementID (question_index)).show ();
	_questionnaire__CurrentQuestionIndex = question_index;
}

function HideQuestion (questionnaire, question_index)
{
	var eQ = $('#' + GetQuestionElementID (question_index));
	eQ.hide ();
}

// 下一步 / 下一个问题
// 根据当前问题的选项，走到下一题。
function GotoNextQuestion (questionnaire)
{
	var option_group = $('input:radio[name=q' + _questionnaire__CurrentQuestionIndex + ']');
	var checked_option = $('input:radio[name=q' + _questionnaire__CurrentQuestionIndex + ']:checked')
	//var checked_option = option_group.find (':checked');
	var iCheckedOptionIndex = option_group.index (checked_option);
	var answer = checked_option.val ();
	if (answer == undefined)
	{
		alert ('请选择一个回答 | Please answer the question');
		return;
	}

	var iNextQuestionIndex = questionnaire.questions[_questionnaire__CurrentQuestionIndex].options[iCheckedOptionIndex].next;
	//alert (iNextQuestionIndex);
	var eQ = $('#' + GetQuestionElementID (iNextQuestionIndex));
	if (eQ.length == 0)
	{
		alert ('问题 ' + (iNextQuestionIndex+1) + ' 不存在，问卷设计的有问题 | Question ' + (iNextQuestionIndex+1) + ' does not exists, it\'s issue of this questionnaire.');
		return;
	}

	_questionnaire__Flow.push (iNextQuestionIndex);
	//alert (_questionnaire__Flow);
	ShowQuestion (questionnaire, iNextQuestionIndex);
}

// 上一步 / 上一个问题
// 从根据 __Flow 中找到流程的上一题，将当前题目隐藏，将上一题重新显示出来
function GotoPreviousQuestion (questionnaire)
{
	if (_questionnaire__Flow.length <= 1)
	{
		alert ('尚未进入下一步，所以没有上一步 | The questionnaire flow not yet started, so there\'s no previous question');
		return;
	}

	var iValueOfLastIndex = _questionnaire__Flow.pop ();
	//alert (iValueOfLastIndex);
	//alert (_questionnaire__Flow);
	HideQuestion (questionnaire, iValueOfLastIndex);
	ShowQuestion (questionnaire, _questionnaire__Flow[_questionnaire__Flow.length - 1]);
}
