<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Maji</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-touch-fullscreen" content="yes">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" type="image/x-icon" href="<?php bs() ?>public/assets/img/amiraza_logo.jpg" />
	<!--
    <link rel="shortcut icon" href="<?php bs() ?>public/assets/img/favcon.png"/>
	-->
	<link type='text/css' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600' rel='stylesheet'>

	<link type="text/css" href="<?php bs('public/assets/fonts/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet"> <!-- Font Awesome -->
	<link type="text/css" href="<?php bs('public/assets/fonts/themify-icons/themify-icons.css') ?>" rel="stylesheet"> <!-- Themify Icons -->
	<link type="text/css" href="<?php bs('public/assets/css/styles.css') ?>" rel="stylesheet"> <!-- Core CSS with all styles -->

	<link type="text/css" href="<?php bs('public/assets/plugins/codeprettifier/prettify.css') ?>" rel="stylesheet"> <!-- Code Prettifier -->
	<link type="text/css" href="<?php bs('public/assets/plugins/iCheck/skins/minimal/blue.css') ?>" rel="stylesheet"> <!-- iCheck -->
	<link type="text/css" href="<?= base_url('public/assets/css/animate.css') ?>" rel="stylesheet">
	<!-- Animate css -->

	<link type="text/css" href="<?php bs('public/assets/plugins/switchery/switchery.css') ?>" rel="stylesheet"> <!-- Switchery -->

	<link type="text/css" href="<?php bs('public/assets/css/mystyle.css') ?>" rel="stylesheet">

	<link type="text/css" href="<?php bs('public/assets/plugins/progress-skylo/skylo.css') ?>" rel="stylesheet">
	<!-- Skylo -->

	<!-- Custom Checkboxes / iCheck -->
	<link type="text/css" href="<?php bs('public/assets/plugins/iCheck/skins/flat/_all.css') ?>" rel="stylesheet">
	<link type="text/css" href="<?php bs('public/assets/plugins/iCheck/skins/square/_all.css') ?>" rel="stylesheet">

	<link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">

	<link type="text/css" href="<?php bs('public/assets/css/tabbed_dashboard.css?w=3') ?>" rel="stylesheet">
	<style type="text/css">
		.btn {
			margin: 3px !important;
		}

		#topnav.navbar-bluegray {
			background: #C5B358;
		}

		#topnav.navbar-bluegray .logo-area .toolbar-trigger a span.icon-bg {
			background-color: #C5B358;
		}

		#topnav.navbar-bluegray a.username:hover,
		#topnav.navbar-bluegray a.username:focus,
		#topnav.navbar-bluegray a.username:visited {
			background-color: #C5B358;
		}
	</style>

	<!--[if lt IE 10]>
        <script type="text/javascript" src="assets/js/media.match.min.js"></script>
        <script type="text/javascript" src="assets/js/respond.min.js"></script>
        <script type="text/javascript" src="assets/js/placeholder.min.js"></script>
    <![endif]-->
	<!-- The following CSS are included as plugins and can be removed if unused-->

	<link type="text/css" href="<?php bs('public/assets/plugins/jvectormap/jquery-jvectormap-2.0.2.css') ?>" rel="stylesheet"> <!-- jVectorMap -->

	<link type="text/css" href="<?php bs('public/assets/css/build.css') ?>" rel="stylesheet"> <!-- jVectorMap -->

	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<style type="text/css">
		.swal2-container {
			z-index: 10000;
		}
	</style>
	<script type="text/javascript" src="<?= base_url('public/assets/js/jquery-1.10.2.min.js') ?>"></script>
	<script src="https://cdn.ckeditor.com/4.14.0/standard/ckeditor.js"></script>

	<a href="javascript:;" id="demoskylo"></a>

	<!-- Load jQuery -->

	<style>
		table td {
			vertical-align: middle !important;
		}

		.success-noty {
			background-color: #8bc34a;
			color: white;
		}

		.error-noty {
			background-color: #dd191d;
			color: white;
		}

		.error {
			color: red;
		}
	</style>

</head>

<body class="animated-content">

	<header id="topnav" class="navbar navbar-yellow navbar-fixed-top" role="banner" style="background-color: #00394d">

		<div class="logo-area">
			<span id="trigger-sidebar" class="toolbar-trigger toolbar-icon-bg">
				<a data-toggle="tooltips" data-placement="right" title="Toggle Sidebar">
					<span class="icon-bg" style="background-color: #004d66">
						<i class="ti ti-menu"></i>
					</span>
				</a>
			</span>

			<!--<a class="navbar-brand" href="#">SDA Enrollment Portal</a>-->

		</div><!-- logo-area -->

		<ul class="nav navbar-nav toolbar pull-right">

			<?php $user = $this->ion_auth->user()->row(); ?>
			<?php if (!user_is('admin')) : ?>
				<!-- <li><a href="<?= base_url(); ?>payments/pay/premium"><i style="font-size: 30px;color: gold;" class="ti ti-crown"></i></a></li> -->
			<?php endif; ?>
			<li class="dropdown toolbar-icon-bg">
				<a href="#" class="dropdown-toggle username" data-toggle="dropdown">
					<?php
					if (empty($user->user_img)) {

					?>
						<img src="<?php bs() ?>public/assets/img/default_user.png" class="img-responsive img-circle" width="200" alt="">
					<?php
					} else {
					?>
						<img src="<?php bs() ?>uploads/<?php echo $user->user_img ?>" class="img-responsive img-circle" width="200" alt="">
					<?php
					}


					?>
				</a>
				<ul class="dropdown-menu userinfo arrow">
					<li><a href="<?php bs('users/terms') ?>">
							<i class="ti ti-settings"></i><span>Terms</span></a></li>
					<li class="divider"></li>
					<li><a href="<?php bs('users/profile') ?>">
							<i class="ti ti-user"></i><span>Profile</span></a></li>
					<li class="divider"></li>
					<li>
						<a href="<?= base_url('users/auth/logout') ?>">
							<i class="ti ti-shift-right"></i><span>Sign Out</span>
						</a>
					</li>
				</ul>
			</li>

		</ul>

	</header>

	<script>
		// window.onload = function() {
		// 	var checking = true;
		// 	var check_orders = setInterval(call_function, 30000);

		// 	function call_function() {
		// 		notify_pending_orders(check_orders);
		// 	}

		// 	function notify_pending_orders(check_orders) {
		// 		var settings = {
		// 			"url": "<?php bs() ?>api/get_pending_orders_count",
		// 			"method": "GET",
		// 			"timeout": 0,
		// 			"processData": false,
		// 			"mimeType": "multipart/form-data",
		// 			"contentType": false
		// 		};

		// 		$.ajax(settings).done(function(response) {
		// 			console.log(response);
		// 			response_decode = JSON.parse(response);
		// 			if (response_decode.message > 0) {
		// 				const audio = new Audio("<?php bs() ?>eventually-590.mp3");
		// 				audio.play();
		// 			}
		// 		});
		// 	}

		// 	var order_notifications = document.getElementById("order_notifications");
		// 	if (order_notifications) {
		// 		order_notifications.onclick = function() {
		// 			if (checking) {
		// 				clearInterval(check_orders);
		// 				checking = false;
		// 				order_notifications.innerHTML = '<i class="ti ti-angle-right"></i> Start Order Notifications';
		// 			} else {
		// 				check_orders = setInterval(call_function, 30000);
		// 				checking = true;
		// 				order_notifications.innerHTML = '<i class="ti ti-angle-right"></i> Stop Order Notifications';
		// 			}
		// 		}
		// 	}
		// };
	</script>
