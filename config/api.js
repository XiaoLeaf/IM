const common = require('@/config/common.js')

module.exports = {
	/**
	 * 订单状态
	 */
	ORDER_STATUS: {},
	/**
	 * 验证码类型
	 */
	CODE_TYPE: {
		LOGIN_CODE: 1, //登录&注册验证码
		VALIDATE_CODE: 4, //验证身份验证码
		BIND_NEW_PHONE: 5, //绑定新手机
		MODIFY_LOGIN_PWD: 6, //修改登录密码
		MODIFY_PAY_PWD: 7, //修改支付密码
		REAL_NAME_CODE: 8 ,//实名认证
	},

	/**
	 * 路由白名单，无需用户鉴权
	 */
	white_list: [
		'/pages/index/index'
	],

	/**
	 * tab页路径
	 */
	tab_list: [
		
	],

	/**
	 * 微信授权相关
	 */
	auth_lang: 'en',

	auth_desc: '用于完善会员资料',
	
	/**
	 * 平台币-名称
	 */
	coinName: '绑币',

	/**
	 * LocalStorage的key值
	 */
	userInfo: common.storagePrefix + 'userInfo', //用户信息

	authorization: common.storagePrefix + 'authorization', //鉴权token

	unionUser: common.storagePrefix + 'unionUser', //本地生成用户唯一标识

	version: common.storagePrefix + 'version', //小程序当前版本key值

	defPhoto: common.storagePrefix + 'defPhoto', //默认头像

	openid: common.storagePrefix + 'openid', //公众号openid

	cartInfo: common.storagePrefix + 'cartInfo', //购物车

	ref: common.storagePrefix + 'ref', //推荐人
	
	qd: common.storagePrefix + 'qd', //渠道
	
	indexConfigVersion: common.storagePrefix + 'configVersion', //全局配置version
	
	capsule: common.storagePrefix + 'capsule', //胶囊按钮信息
	
	userList: common.storagePrefix + 'userList', //本地用户列表
	
	lastAccount: common.storagePrefix + 'lastAccount', //上次登录的小号
	
	agreeDeal: common.storagePrefix + 'agreeDeal', //是否同意用户协议
	
	androidUpdate: common.storagePrefix + 'androidUpdate', //Android端状态栏高度更新
	
	hasUpdateStatusH: common.storagePrefix + 'hasUpdateStatusH', //是否更新状态栏高度

	/**
	 * 加密key值
	 */
	stStr: 'ImCaaAppTk',
	
	/**
	 * 渠道
	 */
	qdStr: 'ios',
	
	/**
	 * 连接socket事件名称
	 */
	connectSocket: 'connectSocket',

	/**
	 * 接口地址
	 */
	
	index: {
		start: '/index/start', //首页-初始化
		get_config: '/index/get_config', //全局配置
	},
	
	user: {
		index: '/user/index', //我的-首页
		userinfo: '/user/user_info', //用户信息
		real_auth: '/user/real_auth', //实名认证
		modify_login_pwd: '/user/modify_login_pwd', //修改登录密码
		modify_pay_pwd: '/user/modify_pay_pwd', //修改支付密码
		modify_tel: '/user/modify_tel', //修改手机
		icon: '/user/icon', //头像
		nickname: '/user/nickname', //昵称
		username: '/user/username', //用户名
	},
	
	auth: {
		code: '/auth/code', //验证码
		tel_login: '/auth/tel_login', //登录&&注册
		pwd_login: '/auth/pwd_login', //密码登录
		switch: '/auth/switch', //切换用户
		logout: '/auth/logout', //退出登录
		check_ref: '/auth/check_ref', //检测邀请人
		bind_ref: '/auth/bind_ref', //绑定邀请人
		get_wx_openid: '/auth/get_wx_openid', //微信code换取openid
	},
	
	cms: {
		get_list: '/cms/get_list', //文章列表
		item: '/cms/item', //文章详情
		page: '/cms/page', //文章单页
	},
	
	any: {
		page: '/any/pages', //单页文章-不校验token
		oss_upload_params: '/any/oss_upload_params', //oss上传参数
		check_update: '/any/check_update', //检测更新
	},
	
	found: {
		index: '/found/index', //发现首页
		gift_list: '/found/gift_list', //礼包-列表
		gift_get: '/found/gift_get', //礼包-领取
		box_init: '/found/box_init', //宝库-初始化
		box_get: '/found/box_get', //宝库-领取
		invite_init: '/found/invite_init', //邀请好友-初始化
		redbag: '/found/redbag_get', //邀请好友-领红包
		draw_init: '/found/draw_init', //幸运抽奖-初始化
		signin: '/found/signin', //幸运抽奖-每日签到
		draw_get: '/found/draw_get', //幸运抽奖-抽奖
		draw_record: '/found/draw_record', //抽奖记录&任务记录
		invite_profit: '/found/invite_profit', //邀请好友-收益概况
		box_record: '/found/box_record', //7兔宝库-领取记录&机会记录
		invite_poster: '/found/invite_poster', //邀请好友-生成海报
		invite_user_list: '/found/invite_user_list', //邀请好友-邀请列表
		invite_order_list: '/found/invite_order_list', //邀请好友-订单列表
	},
	
	ud: {
		wallet: '/ud/wallet', //钱包首页
		recharge: '/ud/recharge', //充值
		game_account_list: '/ud/game_account_list', //小号管理-列表
		exchange_coin: '/ud/exchange_coin', //兑换绑币-初始化
		exchange_coin_submit: '/ud/exchange_coin_submit', //兑换绑币-弹窗&执行
		money_list: '/ud/money_list', //萝卜明细
		coin_list: '/ud/coin_list', //绑币明细
	},
	
	pay: {
		do_pay: '/pay/do_pay', //支付请求
		check: '/pay/check', //检测支付
	},
	
	game: {
		demo: '/game/demo', //游戏demo
		sign_test: '/game/sign_test', //签名测试
		start: '/game/start', //开始游戏
		item: '/game/item', //游戏详情
		role_report: '/game/role_report', //角色上报
		open_pay: '/game/open_pay', //支付请求
		init: '/game/init', //游戏-初始化
		create_game_account: '/game/create_game_account', //游戏-创建小号
		modify_game_account_name: '/game/modify_game_account_name', //游戏-修改小号昵称
		gift: '/game/gift', //游戏礼包
		comment_list: '/game/comment_list', //游戏-评论-全部评论
		comment_submit: '/game/comment_submit', //游戏-评论-提交
		article_list: '/game/article_list', //游戏-攻略-全部攻略
		article_item: '/game/article_item', //游戏-攻略-详情页
	},
	
	im: {
		bind: '/im/bind', //绑定用户
		get_online_user: '/im/get_online_user', //获取所有在线用户
		single_chat_init: '/im/single_chat_init', //单聊初始化
		single_chat_send: '/im/single_chat_send', //单聊-发送消息
	}
}
