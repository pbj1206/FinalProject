<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<aside class="right-sidebar with-vertical">
	<!-- Start Vertical Layout Sidebar -->
	<div class="d-flex align-items-center">
		<a href="javascript:void(0)" class="ms-auto text-decoration-none fs-5 d-block" onclick="openSidemenu()" style="margin-right: 5%; margin-top: 5%"> <i class="ti ti-x"></i>
		</a>
	</div>

	<div class="scroll-sidebar" data-simplebar>
		<!-- Sidebar navigation-->
		<nav class="sidebar-nav">
			<ul id="sidebarnav" class="mb-0">
				<!-- ============================= -->
				<!-- Apps -->
				<!-- ============================= -->
				<li class=""><span class="hide-menu">Apps</span></li>
				<li class="sidebar-item service">
					<ul aria-expanded="false" class="collapse first-level service-item">
						<li class="sidebar-item"><a href="#/main/eco-shop.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">Shop One</span>
						</a></li>
						<li class="sidebar-item"><a href="#/main/eco-shop2.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">Shop Two</span>
						</a></li>
						<li class="sidebar-item"><a href="#/main/eco-shop-detail.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">Details One</span>
						</a></li>
						<li class="sidebar-item"><a href="#/main/eco-shop-detail2.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">Details Two</span>
						</a></li>
						<li class="sidebar-item"><a href="#/main/eco-product-list.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">List</span>
						</a></li>
						<li class="sidebar-item"><a href="#/main/eco-checkout.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">Checkout</span>
						</a></li>
					</ul>
				</li>

				<!-- ============================= -->
				<!-- 일정 -->
				<!-- ============================= -->
				<li class="sidebar-item service"><a class="sidebar-link has-arrow warning-hover-bg" href="javascript:void(0)" aria-expanded="false"> <span class="aside-icon p-2 bg-warning-subtle rounded-1"> <iconify-icon icon="hugeicons:stamp" class="fs-7"></iconify-icon>
					</span> <span class="hide-menu ps-1">전자결재</span>
				</a>
					<ul aria-expanded="false" class="collapse first-level service-item">
						<li class="sidebar-item service-item"><a id="myDocMainBtn" class="sidebar-link has-arrow success-hover-bg" aria-expanded="false" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">내 결재함</span>
							</a>
							<ul aria-expanded="false" class="collapse two-level">
								<li class="sidebar-item" id="docInsertBtn"><a id="docInsert" class="sidebar-link indigo-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">결재문서 작성</span>
								</a></li>
								<li class="sidebar-item"><a id="docApproval" class="sidebar-link primary-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">결재할 문서</span>
								</a></li>
								<li class="sidebar-item"><a id="docMine" class="sidebar-link danger-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">작성 문서</span>
								</a></li>
								<li class="sidebar-item"><a id="docCurrent" class="sidebar-link warning-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">결재 진행 현황</span>
								</a></li>
								<li class="sidebar-item"><a id="docRejected" class="sidebar-link success-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">반려 문서</span>
								</a></li>
								<li class="sidebar-item"><a id="docReturned" class="sidebar-link indigo-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">회수한 문서</span>
								</a></li>
								<li class="sidebar-item"><a id="docComplete" class="sidebar-link primary-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">결재 완료 문서</span>
								</a></li>
							</ul>
						</li>
					</ul></li>
				<li class="sidebar-item service"><a class="sidebar-link has-arrow danger-hover-bg" href="javascript:void(0)" aria-expanded="false"> <span class="aside-icon p-2 bg-success-subtle rounded-1"> <iconify-icon icon="solar:smart-speaker-minimalistic-line-duotone" class="fs-6" />
					</span> <span class="hide-menu ps-1">프로젝트</span>
				</a>
					<ul aria-expanded="false" class="collapse first-level service-item">
						<li class="sidebar-item service-item"><a id="myPjtMainBtn" class="sidebar-link has-arrow success-hover-bg" aria-expanded="false" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">내 프로젝트</span>
						</a>
							<ul aria-expanded="false" class="collapse two-level">
								<li class="sidebar-item"><a id="pjtInsert" class="sidebar-link indigo-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">프로젝트 등록</span>
								</a></li>
								<li class="sidebar-item" id="docInsertBtn"><a id="pjtProgress" class="sidebar-link primary-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">진행 프로젝트</span>
								</a></li>
								<li class="sidebar-item"><a id="pjtComplete" class="sidebar-link warning-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">완료 프로젝트</span>
								</a></li>
								<li class="sidebar-item"><a id="pjtAbort" class="sidebar-link danger-hover-bg"> <span class="sidebar-icon"></span> <span class="hide-menu">중단 프로젝트</span>
								</a></li>
							</ul></li>
					</ul>
				<li class="sidebar-item service"><a class="sidebar-link has-arrow success-hover-bg" href="javascript:void(0)" aria-expanded="false"> <span class="aside-icon p-2 bg-success-subtle rounded-1"> <iconify-icon icon="solar:calendar-mark-bold" class="fs-6" />
					</span> <span class="hide-menu ps-1">일정</span>
				</a>
					<ul aria-expanded="false" class="collapse first-level service-item" onclick="CalendarList()">
						<li class="sidebar-item" id="allcal"><a class="sidebar-link primary-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">전체 일정</span>
						</a></li>
						<li class="sidebar-item" id="privatecal"><a class="sidebar-link danger-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">개인 일정</span>
						</a></li>
						<li class="sidebar-item" id="companycal"><a class="sidebar-link warning-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">스레드 일정</span>
						</a></li>
						<li class="sidebar-item" id="chcal"><a class="sidebar-link indigo-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">채널 일정</span>
						</a></li>
					</ul></li>
				<li class="sidebar-item service"><a class="sidebar-link has-arrow indigo-hover-bg" href="javascript:void(0)" aria-expanded="false"> <span class="aside-icon p-2 bg-indigo-subtle rounded-1"> <i class="ti ti-archive fs-6"></i>
					</span> <span class="hide-menu ps-1">자원</span>
				</a>
					<ul aria-expanded="false" class="collapse first-level service-item">
						<li class="sidebar-item" id="eqpListBtn" onclick="eqpList()"><a class="sidebar-link success-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">자원 목록</span>
						</a></li>
						<li class="sidebar-item" id="eqpLiveBtn" onclick="eqpLive()"><a class="sidebar-link primary-hover-bg" style="cursor: pointer"> <span class="sidebar-icon"></span> <span class="hide-menu">자원 현황</span>
						</a></li>
					</ul></li>
				<!-- ============================= -->
				<!-- 일정 끝-->
				<!-- ============================= -->
				<!-- ============================= -->
				<!-- To do list -->
				<!-- ============================= -->
				<li class="sidebar-item service" id="todoList" style="cursor: pointer"><a class="sidebar-link primary-hover-bg" aria-expanded="false"> <span class="aside-icon p-2 bg-primary-subtle rounded-1"> <i class="ti ti-list-check fs-6"></i>
					</span> <span class="hide-menu ps-1">해야 할 업무</span>
				</a></li>
				<!-- ============================= -->
				<!-- To do list 끝 -->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- 자원 -->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- 자원 끝-->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- Chat 끝-->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- 주소록 -->
				<!-- ============================= -->
				<li class="sidebar-item service" id="contact" style="cursor: pointer"><a class="sidebar-link warning-hover-bg" aria-expanded="false"> <span class="aside-icon p-2 bg-warning-subtle rounded-1"> <i class="ti ti-address-book fs-7"></i>
					</span> <span class="hide-menu ps-1">주소록</span>
				</a></li>
				<!-- ============================= -->
				<!-- 주소록 끝 -->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- 드라이브 -->
				<!-- ============================= -->
				<li class="sidebar-item service" id="drive" style="cursor: pointer"><a class="sidebar-link danger-hover-bg" aria-expanded="false"> <span class="aside-icon p-2 bg-danger-subtle rounded-1"> <i class="ti ti-brand-onedrive fs-7"></i>
					</span> <span class="hide-menu ps-1">드라이브</span>
				</a></li>
				<!-- ============================= -->
				<!-- 드라이브 끝 -->
				<!-- ============================= -->

				<!-- ============================= -->
				<!-- 멤버십 -->
				<!-- ============================= -->
				<li class="sidebar-item service"><a class="sidebar-link success-hover-bg" href="javascript:void(0)" aria-expanded="false" onclick="planPage()"> <span class="aside-icon p-2 bg-success-subtle rounded-1"> <i class="ti ti-coin fs-6"></i>
					</span> <span class="hide-menu ps-1">멤버십</span>
				</a></li>
				<!-- ============================= -->
				<!-- 멤버십 끝 -->
				<!-- ============================= -->
				
				<!-- ============================= -->
				<!-- Chat -->
				<!-- ============================= -->
				<li class="sidebar-item service" onclick="chatopen()" style="cursor: pointer"><a class="sidebar-link indigo-hover-bg" aria-expanded="false"> <span class="aside-icon p-2 bg-indigo-subtle rounded-1"> <iconify-icon icon="solar:chat-round-unread-line-duotone" class="fs-6"></iconify-icon>
					</span> <span class="hide-menu ps-1">채팅</span>
				</a></li>
				<li class="sidebar-item service" id="faceChatList" style="cursor: pointer"><a class="sidebar-link primary-hover-bg" aria-expanded="false"> <span class="aside-icon p-2 bg-primary-subtle rounded-1"> <i class="ti ti-video fs-7"></i>
					</span> <span class="hide-menu ps-1">화상채팅</span>
				</a></li>
			</ul>
		</nav>
	</div>
</aside>
<script type="text/javascript">
	function openSidemenu() {
		$(".right-sidebar").toggleClass('menu-on');
	};
	$(".service").on("click", function() {
		var ul = $(this).find(".service-item");
		if (ul.length == 0) {
			if (ul.find("li").length == 0) {
				$(".right-sidebar").toggleClass('menu-on');
			}
		}
	});
	$(".service").on("click", ".service-item li", function() {
		var li = $(this).find("li");
		if (li.length == 0) {
			$(".right-sidebar").toggleClass('menu-on')
		}
	});
	$(".service").on("click", ".service-item li li li", function() {
		$(".right-sidebar").toggleClass('menu-on')
	});
</script>