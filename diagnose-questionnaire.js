var __questionnaire =
{
	start: 0,
	questions:
	[
		{
			q: '<span lang="zh">故障现象</span><span lang="en">What\'s the phenomenon?</span>',
			options:
			[
				{
					v: 'back-plate-led-flashing',
					l: '<span lang="zh">后面板 LED 指示灯闪烁、线控灯不亮</span><span lang="en">Back plate LED is flashing, and all LEDs on control POD are off</span',
					next: 1,
				},
				{
					v: 'no-lfe',
					l: '<span lang="zh">个别声道不响</span><span lang="en">No sounds on some channels</span>',
					next: 2,
				},
				{
					v: 'burst-distortion',
					l: '<span lang="zh">输入音量调高后，某个或某些声道出现破音失真。同时，调节音箱音量时，在该声道的喇叭中可能会发出每次步进的声音，且步进的声音随着音量升降而对应升降。</span><span lang="en">Burst distortion occurs after adjust the input volume to high level. And, when adjusting the speaker volume, there will comes sounds in each step</span>',
					next: 7,
				},
				{
					v: 'else',
					l: '<span lang="zh">其他情况</span><span lang="en">Something else</span>',
					next: 8,
				},
			]
		},
		{
			q: '<span lang="zh">后面板 LED 指示灯不亮，可能有两种情况导致其发生：<br/>1.电源板C61电容已失效（或者，确切的说）。 <br/>2.功放板出现短路或接近短路的情况（比如，STA575 已被烧毁、或固定螺丝的绝缘圈已损坏导致散热片与铝支架导通）<br/><br/>请打开后面板，将功放板的电源线都拔掉，再开机，插电，看看后面板 LED 灯是否还闪烁</span><span lang="en">There\'re two possible reasons caused back plate LED flashing:<br/>1. Components in standby circuit on PSU board may failed, especially C61 capacitor.<br/>2. AMP board(s) may failed<br/><br/>Please open the back plate, unplug power wires of two AMP boards, then switch the power on to see if the back plate LED is still flashing or not.</span> \
			<br/> \
			',
			options:
			[
				{
					v: 'unplug-amp-wire-back-plate-led-still-flash',
					l: '<span lang="zh">还是闪烁</span><span lang="en">Still flashing</span>',
					next: 3,
				},
				{
					v: 'unplug-amp-wire-back-plate-led-stop-flash',
					l: '<span lang="zh">不再闪烁</span><span lang="en">LED is on, and not flashing anymore</span>',
					next: 4,
				},
			]
		},
		{	// 后面板指示灯闪烁的问题是电源板故障引起的
			q: '<span lang="zh">好，那么问题极有可能是电源板的故障引起的。</span><span lang="en">What\'s the phenomenon?</span> \
			<br/> \
			<br/> \
			请先根据选项答题',
			options:
			[
				{
					v: 'unplug-amp-wire-back-plate-led-still-flash',
					l: 'aaaaaaa',
					next: 5,
				},
				{
					v: 'unplug-amp-wire-back-plate-led-still-flash',
					l: 'bbbbbbbbbb',
					next: 6,
				},
			]
		},
		{
			q: '',
			options:
			[
			]
		},
		{
			q: '',
			options:
			[
			]
		},
		{
			q: '',
			options:
			[
			]
		},
		{
			q: '',
			options:
			[
			]
		},
		{
			q: '是不是清理过音频处理板上的变质胶，但没清理干净？不用我说，你现在也知道该怎么做了…',
			options:
			[
			]
		},
		{
			q: '',
			options:
			[
			]
		},
	]
};
