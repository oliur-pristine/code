<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>
<script>

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth > 992) {
        // Get all nav-link-dropdown elements
        const dropdowns = document.querySelectorAll('.nav-link-dropdown');
        const navbarBg = document.getElementById('navbar-bg');

        // Add click event listener to each nav-link-dropdown
        dropdowns.forEach(dropdown => {
            const dropdownLinksWrapper = dropdown.querySelectorAll('.dropdown-link-wrapper');

            dropdown.addEventListener('click', () => {
                // Hide all dropdown links on other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        gsap.to(otherDropdown.querySelectorAll('.dropdown-link-wrapper'), {
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                        otherDropdown.classList.remove('open'); // Reset other dropdowns
                    }
                });

                // Toggle the visibility of dropdown links on the clicked dropdown
                if (dropdown.classList.contains('open')) {
                    gsap.to(dropdownLinksWrapper, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            dropdown.classList.remove('open');
                        }
                    });

                    // Check if dropdown was clicked twice successively
                    if (dropdown.classList.contains('prev-open')) {
                        gsap.to(navbarBg, {
                            height: '0vh',
                            duration: 0.5,
                            ease: 'power2'
                        });
                    }

                    dropdown.classList.remove('prev-open');
                } else {
                    gsap.set(dropdownLinksWrapper, {
                        opacity: 0,
                        y: 15
                    });
                    gsap.to(dropdownLinksWrapper, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });
                    dropdown.classList.add('open');
                    dropdown.classList.add('prev-open');

                    // Reset navbar-bg height
                    gsap.to(navbarBg, {
                        height: '100vh',
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
});

</script>

<script>

$(document).ready(function() {
		$(".navbar-links_wrapper").css("display", "flex");
    $(".nav-link-wrapper").click(function() {
        var $currentDropdown = $(this).siblings(".nav-dropdown-wrapper");

        // Check if window width is 992px or smaller
        if ($(window).width() <= 992) {
            // If the clicked dropdown is already open, close it
            if ($currentDropdown.css("height") !== "0px") {
                $currentDropdown.css("height", "0px");
            } else {
                // Hide all other dropdowns
                $(".nav-dropdown-wrapper").css("height", "0px");
                
                // Show the sibling dropdown using 'auto'
                $currentDropdown.css("height", "auto");
            }
        }
    });
});

</script>

<script>

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth > 992) {
        $('.nav-link-dropdown').on('click', function() {
            var dropdown = $(this);
            var dropdownLinksWrapper = dropdown.find('.dropdown-link-wrapper');
            var isActive = dropdownLinksWrapper.hasClass('active');

            $('.active').removeClass('active');
            if (!isActive) {
                dropdownLinksWrapper.addClass('active');
            }
        });
    }
});

</script>

<script>

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

</script>

<script>

gsap.registerPlugin(ScrollTrigger);

let triggerElement = $(".section-hero"); 
let targetElement = $(".navbar-bg-2");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: triggerElement,
    start: "top top", // starts animation when the top of ".section-hero" hits the top of the viewport
    end: "bottom top",
    scrub: 1
  }
});

tl.to(targetElement, {
  height: "4.5vh",
  opacity: 1, // remember, opacity is between 0 and 1, so "100%" opacity is represented by 1
});

</script>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>

// toggleHeight function
const toggleHeight = (element, expand) => {
    if (expand) {
        element.style.maxHeight = `${element.scrollHeight}px`;
    } else {
        element.style.maxHeight = '0px';
    }
};

// Create an observer instance
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            const targetNode = mutation.target;
            const nextSibling = targetNode.nextElementSibling;
            const arrowWrapper = targetNode.querySelector('.side-nav-arrow');
            if(targetNode.classList.contains('w--current')) {
                toggleHeight(nextSibling, true);
                arrowWrapper.style.transform = "rotate(90deg)";
            } else {
                toggleHeight(nextSibling, false);
                arrowWrapper.style.transform = "rotate(0deg)";
            }
        }
    });
});

// configuration of the observer:
const config = { attributes: true, childList: false, characterData: false };

// select the target nodes and pass in the target nodes, as well as the observer options
const targetNodes = document.querySelectorAll('.category-title-wrapper');
targetNodes.forEach(node => {
    observer.observe(node, config);
    const nextSibling = node.nextElementSibling;
    const arrowWrapper = node.querySelector('.side-nav-arrow');
    if(!node.classList.contains('w--current')) {
        toggleHeight(nextSibling, false);
        arrowWrapper.style.transform = "rotate(0deg)";
    }
});

// handle hover effect
const categoryWrappers = document.querySelectorAll('.category-wrapper');
categoryWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseover', function() {
        const titleWrapper = this.querySelector('.category-title-wrapper');
        if(!titleWrapper.classList.contains('w--current')) {
            titleWrapper.classList.add('w--current');
            titleWrapper.dataset.hoverAdded = 'true'; // mark that we added the class on hover
        }
    });

    wrapper.addEventListener('mouseout', function() {
        const titleWrapper = this.querySelector('.category-title-wrapper');
        if(titleWrapper.dataset.hoverAdded === 'true') {
            // only remove 'w--current' if it was added on hover
            titleWrapper.classList.remove('w--current');
            titleWrapper.dataset.hoverAdded = 'false'; // unmark it
        }
    });
});

</script>




<!-- F’in sweet Webflow Hacks -->
<script>
// when the DOM is ready
$(document).ready(function() {
	// get the li items
	const listItems = $('li');
  // for each li item
	listItems.each(function(index, item){
  	// check for '~' character
    // it's recommended to start with the deepest level of sub bullet
    // to ensure only the relevant classes are applied
    
    // if the li item text starts with '~~'
    if($(item).text().startsWith('~~')){
    	// run indentText() function
  		indentText(this, 'hack20-sub-bullet-2');
  	}	// else if the li item starts with '~'
		else if($(item).text().startsWith('~')){
    	// run indentText() function
  		indentText(this, 'hack20-sub-bullet');
 		}	
	});
 
  // indentText function
  function indentText(li, className){
  	// add relevant className to li item
    // if the li item text starts with '~~' add the sub-bullet-2 class
    // else if the li item starts with '~' add the sub-bullet class
  	$(li).addClass(className);
    // remove the '~' from the li items
    // the regex /~+/g 
		// matches any one or more ~ characters
    const reformatedText = $(li).html().replace(/~+/g,'');
    // replace the li item's html text that has ~ tags
    // with the new text that removed the ~ character(s)
    $(li).html(reformatedText);
  }
});
</script>
