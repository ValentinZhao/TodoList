# LeetCode个别解题思路记录
## 21. Merge Two Sorted Lists
先上递归代码

	var mergeTwoLists = function(l1, l2) {
	    if (l1 === null) return l2
	    if (l2 === null) return l1
	    if(l1.val < l2.val){
	        l1.next = mergeTwoLists(l1.next, l2)
	        return l1
	    } else {
	        l2.next = mergeTwoLists(l2.next, l1)
	        return l2
	    }
	};
方法亮点就是，先直接递归到l1,l2最大的那个值的位置，然后递归回退，l1为空回退l2，反之亦然；在选择判断部分，如果之前是l1为空，说明最大值不在这条链表上，会返回l2，再由于if是按该节点大小来判断进入的，所以这一层返回的链表头是恰好大于l1.next(l2.next)的，完成了链表衔接