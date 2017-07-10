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

## 28.Implement strStr()
比对字符串

	public int strStr(String haystack, String needle) {
	  for (int i = 0; ; i++) {
	    for (int j = 0; ; j++) {
	      if (j == needle.length()) return i;
	      if (i + j == haystack.length()) return -1;
	      if (needle.charAt(j) != haystack.charAt(i + j)) break;
	    }
	  }
	}
用嵌套循环模拟了两个指针，实现很简洁优雅

## 53.Maximum Subarray
求数组最长子数组。和是最大的。此题运用动态规划的方式，要解决i处的和，先解决i-1的和并依次循环下来。dp这个数组每轮循环都是保存subarray的和。若上一位的dp元素是小于零的，则不再叠加，代表我们放弃之前取的这个子数组（因为它的和是负数）；那么新的dp[i]其实就是A[i]，表示我们从原数组的第i位重新截取新的subarray。

	public int maxSubArray(int[] A) {
	        int n = A.length;
	        int[] dp = new int[n];//dp[i] means the maximum subarray ending with A[i];
	        dp[0] = A[0];
	        int max = dp[0];
	        
	        for(int i = 1; i < n; i++){
	            dp[i] = A[i] + (dp[i - 1] > 0 ? dp[i - 1] : 0);
	            max = Math.max(max, dp[i]);
	        }
	        
	        return max;
	}