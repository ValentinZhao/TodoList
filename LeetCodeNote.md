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
## 88. Merge Sorted Array
代码思路很清晰

	public void merge(int[] A, int m, int[] B, int n) {
	        int i=m-1, j=n-1, k=m+n-1;
	        while (i>-1 && j>-1) A[k--]= (A[i]>B[j]) ? A[i--] : B[j--];
	        while (j>-1) A[k--]=B[j--];
	}
从大数组A的尾部开始，先定义一个指针k指向尾部，依次向前推进，途中每轮都从A,B尾部比较大小，较大的排在大数组尾部。每一轮，i或j只有一个指针会向前移动。这就保证了充分比较。我们注意到，若此时j>-1的话，说明原来是B数组中数字比较多，也是剩下的都是比较小的数字，直接接到A前面就好。原来A中的数字已经在前面的步骤中复制给靠后的位置了。
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
##  67. Add Binary
基本思路是将两个二进制数打成两个数组，将每一位包括进位直接按**位异或**操作即可
## 69. Sqrt(x)
利用二分查找来实现，基本算法思路为如果mid < x/mid但是(mid+1) > (x/(mid+1))的话，这个mid可以看作是x的根

	public int sqrt(int x) {
	    if (x == 0)
	        return 0;
	    int left = 1, right = Integer.MAX_VALUE;
	    while (true) {
	        int mid = left + (right - left)/2;
	        if (mid > x/mid) {
	            right = mid - 1;
	        } else {
	            if (mid + 1 > x/(mid + 1))
	                return mid;
	            left = mid + 1;
	        }
	    }
	}
##　斐波那契数列求和问题
## 83. Remove Duplicates from Sorted List
基本思想是利用递归，先直接进入到链表尾部，比较自己与next，如果相等则返回next，此举的意义在于当我们return的时候，是return给`head.next`的，就完成了当val相等时head.next = head.next.next的操作，删除了head.next本身的值

	var deleteDuplicates = function(head) {
	    if(head === null || head.next === null) return head
	    head.next = deleteDuplicates(head.next)
	    return (head.val === head.next.val) ? head.next : head
	};