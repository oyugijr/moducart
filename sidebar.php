<!-- Sidebar Starts -->
<?php

//getting user data
$user = $this->ion_auth->user()->row();

//getting all user perssions
$users_permissions = group_priviliges();

$new_arr = array();

foreach ($users_permissions as $key => $value) {
    $new_arr[$value] = $value;
}
$logged_in_as = $this->session->userdata('logged_in_as');
?>

<div id="wrapper" style="margin-top: 50px;">
	<div id="layout-static">
		<div class="static-sidebar-wrapper sidebar-midnightblue ">
			<div class="static-sidebar">
				<div class="sidebar ">
					<div class="widget">
						<div class="widget-body">
							<div class="userinfo">
								<div class="avatar">
									<?php
                                    if (empty($user->user_img)) {

                                        ?>
									<img src="<?php bs() ?>public/assets/img/default_user.png"
										class="img-responsive img-circle" width="200" alt="">
									<?php
                                    } else {
                                        ?>
									<img src="<?php bs() ?>uploads/<?php echo $user->user_img ?>"
										class="img-responsive img-circle" width="200" alt="">
									<?php
                                    }


?>
								</div>
								<div class="info">
									<span class="username">
										<?php
    echo $user->first_name . ' ' . $user->last_name;
?>
									</span>
									<span class="useremail">
										<?php
echo $user->email;
?>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="widget stay-on-collapse" id="widget-sidebar">
						<nav role="navigation" class="widget-body">
							<ul class="acc-menu">
								<li class="nav-separator"><span>Maji Control Panel</span></li>
								<li>
									<a
										href="<?= base_url('users/Auth') ?>">
										<i class="ti ti-home"></i><span>Dashboard</span>
									</a>
								</li>
								<li><a href="javascript:;"><i class="ti ti-menu-alt"></i><span>Products</span></a>
									<ul class="acc-menu">
										<li>
											<a
												href="<?= base_url('products') ?>">
												<i class="ti ti-angle-right"></i> All Products
											</a>
										</li>

										<!-- <li>
												<a href="<?= base_url('products/add_product
                                            ') ?>">
										<i class="ti ti-angle-right"></i> Add Product
										</a>
								</li> -->
							</ul>
							</li>

							<li><a href="javascript:;"><i class="ti ti-menu-alt"></i><span>Shops</span></a>
								<ul class="acc-menu">
									<li>
										<a
											href="<?= base_url('shops') ?>">
											<i class="ti ti-angle-right"></i> All Shops
										</a>
									</li>
								</ul>
							</li>

							<li><a href="javascript:;"><i class="fa fa-list-alt"></i><span>Orders</span></a>
								<ul class="acc-menu">
									<li>
										<a
											href="<?= base_url('orders') ?>">
											<i class="ti ti-angle-right"></i> All Orders
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('orders') ?>?status=PENDING">
											<i class="ti ti-angle-right"></i> Pending Orders
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('orders') ?>?status=PROCESSING">
											<i class="ti ti-angle-right"></i> Processing Orders
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('orders') ?>?status=DELIVERING">
											<i class="ti ti-angle-right"></i> Delivering Orders
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('orders') ?>?status=COMPLETED">
											<i class="ti ti-angle-right"></i> Completed Orders
										</a>
									</li>
								</ul>
							</li>
							<li>
								<a
									href="<?= base_url('payments') ?>"><i
										class="fa fa-list-alt"></i><span>Finance</span></a>
							</li>

							<!-- <?php if (in_array('Messages', $new_arr)) : ?>
							<?php if (in_array('Send Chat Request', $new_arr) && in_array('View Chat Notifications', $new_arr)) : ?>
							<li>
								<a
									href="<?= base_url('messages') ?>"><i
										class="ti ti-envelope"></i><span>Messages/Chat</span></a>
							</li>
							<?php endif; ?>
							<?php endif; ?>

							<?php if (in_array('Setup', $new_arr)) : ?>
							<li class="nav-separator"><span>ADMIN FUNCTIONS</span></li>
							<li><a href="javascript:;"><i class="ti ti-crown"></i><span>Premium Features</span></a>
								<ul class="acc-menu">


									<li>
										<a
											href="<?= base_url('premium_features/add_feature') ?>">
											<i class="ti ti-angle-right"></i> Add Feature
										</a>
									</li>


									<li>
										<a
											href="<?= base_url('premium_features') ?>">
											<i class="ti ti-angle-right"></i> All Features
										</a>
									</li>


								</ul>
							</li>
							<li>
								<a href="javascript:;"><i class="ti ti-settings"></i><span>Setup</span></a>
								<ul class="acc-menu">
									<li>
										<a
											href="<?= base_url('site_config') ?>">
											<i class="ti ti-angle-right"></i><span>General</span>
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('site_config/Login_setup') ?>">
											<i class="ti ti-angle-right"></i><span>Login</span>
										</a>
									</li>
								</ul>
							</li>
							<?php endif ?> -->
							<?php //if (in_array('Users', $new_arr)) :?>
							<li><a href="javascript:;"><i class="fa fa-users"></i><span>Users</span></a>
								<ul class="acc-menu">
									<li>
										<a
											href="<?= base_url('users/create_user') ?>">
											<i class="ti ti-angle-right"></i> Add User
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('users') ?>">
											<i class="ti ti-angle-right"></i> All Users
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('users/active_vendors') ?>">
											<i class="ti ti-angle-right"></i> Active Vendors
										</a>
									</li>
								</ul>
							</li>
							<?php //endif?>
							<!-- <?php if (in_array('Groups', $new_arr)) : ?>
							<li><a href="javascript:;"><i class="fa fa-users"></i><span>Groups & Permissions</span></a>
								<ul class="acc-menu">
									<li>
										<a
											href="<?= base_url('users/User_groups') ?>">
											<i class="ti ti-angle-right"></i> View Groups
										</a>
									</li>
									<li>
										<a
											href="<?= base_url('users/User_groups/create_group') ?>">
											<i class="ti ti-angle-right"></i> Create Groups
										</a>
									</li>

									<li>
										<a
											href="<?= base_url('users/User_groups/permissions') ?>">
											<i class="ti ti-angle-right"></i> Permissions
										</a>
									</li>
								</ul>
							</li>

							<?php endif ?> -->
							<?php //if (in_array('email members', $new_arr)) :?>

							<li>
								<a
									href="<?php bs() ?>users/email/email_members">
									<i class="fa fa-envelope-o" aria-hidden="true"></i>
									<span>User Communication</span>
								</a>
							</li>

							<?php //endif?>
							<?php if (in_array('Social Login Setup', $new_arr)) : ?>

							<!-- <li>
											<a href="javascript:;"><i class="fa fa-wrench"></i><span>Social Login</span></a>
											<ul class="acc-menu">
												<li>
													<a href="<?= base_url('site_config/fb_config') ?>">
							<i class="ti ti-facebook"></i> Facebook Config
							</a>
							</li>
							<li>
								<a
									href="<?= base_url('site_config/twitter_config') ?>">
									<i class="ti  ti-twitter"></i> Twitter Config
								</a>
							</li>
							<li>
								<a
									href="<?= base_url('site_config/google_config') ?>">
									<i class="ti  ti-google"></i> Google Config
								</a>
							</li>
							<li>
								<a
									href="<?= base_url('site_config/insta_config') ?>">
									<i class="ti ti-instagram"></i> Instagram Config
								</a>
							</li>
							<li>
								<a
									href="<?= base_url('site_config/linkedin_config') ?>">
									<i class="ti ti-linkedin"></i> Linkedin Config
								</a>
							</li>

							</ul>
							</li> -->

							<?php endif ?>

							<?php if (in_array('Backup & Export Users', $new_arr)) : ?>

							<!-- <li>
											<a href="<?= base_url('site_config/backup') ?>">
							<i class="ti ti-server"></i><span>Backup & Export Users</span>
							</a>
							</li> -->

							<?php endif ?>
							</ul>
						</nav>
					</div>

				</div>
			</div>
		</div>

		<!-- Sidebar Ends -->
