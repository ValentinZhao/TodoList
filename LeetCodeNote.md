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
##斐波那契数列求和问题
## 83. Remove Duplicates from Sorted List
基本思想是利用递归，先直接进入到链表尾部，比较自己与next，如果相等则返回next，此举的意义在于当我们return的时候，是return给`head.next`的，就完成了当val相等时head.next = head.next.next的操作，删除了head.next本身的值

	var deleteDuplicates = function(head) {
	    if(head === null || head.next === null) return head
	    head.next = deleteDuplicates(head.next)
	    return (head.val === head.next.val) ? head.next : head
	};
## 100.Same Tree

```
var isSameTree = function(p, q) {
    if(p === null && q === null) return true;
    if(p === null || q === null) return false;
    if(p.val === q.val){
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    return false;
};
```
## 101.Symmetric Tree
判断对称树

```
public boolean isSymmetric(TreeNode root) {
    return root==null || isSymmetricHelp(root.left, root.right);
}

private boolean isSymmetricHelp(TreeNode left, TreeNode right){
    if(left==null || right==null)
        return left==right;
    if(left.val!=right.val)
        return false;
    return isSymmetricHelp(left.left, right.right) && isSymmetricHelp(left.right, right.left);
}
```
## 求树的最大深度
```
var maxDepth = function(root) {
    if(root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```
### 最小深度

```
var minDepth = function(root) {
    return minHeight(root);
};

function minHeight (root) {
    if (root === null) return 0;
    var left = minHeight(root.left);
    var right = minHeight(root.right);
    return (left === 0 || right === 0) ? left + right + 1 : Math.min(left, right) + 1;
}
```
## 按层打印树
```
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if(root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while(queue.size() > 0) {
            List<Integer> list = new ArrayList<>();
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                list.add(node.val);
                if(node.left != null) queue.offer(node.left);
                if(node.right != null) queue.offer(node.right);
            }
            result.add(0, list);
        }
        return result;
    }
}
```
## 将排序数组转换成BST
```
public TreeNode sortedArrayToBST(int[] num) {
    if (num.length == 0) {
        return null;
    }
    TreeNode head = helper(num, 0, num.length - 1);
    return head;
}

public TreeNode helper(int[] num, int low, int high) {
    if (low > high) { // Done
        return null;
    }
    int mid = (low + high) / 2;
    TreeNode node = new TreeNode(num[mid]);
    node.left = helper(num, low, mid - 1);
    node.right = helper(num, mid + 1, high);
    return node;
}
```
## 判断二叉树是否平衡
利用深度优先遍历，记录左右子树的高度作差，即可在一次遍历之后得到是否平衡。

```
var isBalanced = function(root) {
  return dfsHeight(root) != -1;  
};

function dfsHeight (root) {
    if (root === null) return 0;
    var leftHeight = dfsHeight(root.left);
    if (leftHeight === -1) return -1;
    var rightHeight = dfsHeight(root.right);
    if (rightHeight === -1) return -1;
    if(Math.abs(leftHeight - rightHeight) > 1) return -1;
    return 1 + Math.max(leftHeight, rightHeight);
    //也就是说，判断完该节点的左右子树的高度差小于1后
    //该节点的高度其实是左右子树较高的那个 + 1
}
```
## 在树中找和为某值的路径
```
var hasPathSum = function(root, sum) {
    return isExist(root, sum);
};

function isExist(root, sum) {
    if (!root) return false;
    if (!root.left && !root.right && sum - root.val === 0) return true;
    return isExist(root.left, sum - root.val) || isExist(root.right, sum - root.val);
}
```
## 求pascal triangle某一行
基本算法思想就是，它的某一行其实就是先确定头尾、然后中间的位置加对应次数。

```
List<Integer> list = new ArrayList<Integer>();
	if (rowIndex < 0)
		return list;

	for (int i = 0; i < rowIndex + 1; i++) {
		list.add(0, 1);
		for (int j = 1; j < list.size() - 1; j++) {
			list.set(j, list.get(j) + list.get(j + 1));
		}
	}
return list;
```
## 股票最大受益问题（max subarray）
其实可以转化成一列数组求最大差，但此时需要是后面的值大于前面的值才可以。那么最大差值，其实又可以转化为只是求相邻两个元素的差（此题要求是后面的数减前面的数），把这些差值依次加起来，并且每次差值求出来之后先保存起来便于下次比较。现已循环我们又会将新的差值加入maxCur中，随后与maxSoFar比较求出这个循环中比较大的差值。最后结束当然就只剩最大的差值咯。

```
var maxProfit = function(prices) {
    var maxCur = 0;
    var maxSoFar = 0;
    for(var i = 1; i < prices.length; i++) {
        maxCur = Math.max(0, maxCur += prices[i] - prices[i-1]);
        maxSoFar = Math.max(maxCur, maxSoFar);
    }
    return maxSoFar;
};
```
## Single Nunber
找一组数字中唯一一个只出现一次的那个数。算法就是利用异或，两个相同的数异或为零。

```
return nums.reduce((r, n) => r^n);
```

## Min Stack (JavaScript Ver.)

简要思想就是利用JS中的数组来模拟栈，这里的栈在初始化的时候首先维护一个数组（这个数组是二维的，之后讲）和一个最小值的变量。那么我们每次在push的时候，是调用数组的push方法，把一个**数组**push进我们维护的数组中，被push的数组只有两个值，一个是我们原来要push的数字，还有就是`this.minValue`也就是现在栈中最小的值。当然我们在push之后会进行校验和对最小值的更新确保每次push之后都有最小值。同样的栈的pop方法我们还是调用数组的pop方法（JS在这个时候很方便），会从尾部弹出一个数组的元素并返回，此时`this.minValue`的值是这个弹出的元素所保存的minValue。top方法查看栈顶元素，其实就是数组尾部的那个数组的第一位所保存的数字；最后getMin方法就很简单了，直接返回我们维护的this.minValue即可。

```
/**
 * @constructor
 */
var MinStack = function() {
    this.values = [];
    this.minValue;
};

/**
 * @param {number} x
 * @returns {void}
 */
MinStack.prototype.push = function(x) {
    this.values.push([x,this.minValue]);
    
    if(this.values.length === 1)
        this.minValue = x;
    else if(x < this.minValue)
        this.minValue = x;
};

/**
 * @returns {void}
 */
MinStack.prototype.pop = function() {
    var items = this.values.pop();
    this.minValue = items[1];
};

/**
 * @returns {number}
 */
MinStack.prototype.top = function() {
    return this.values[this.values.length - 1][0];
};

/**
 * @returns {number}
 */
MinStack.prototype.getMin = function() {
    return this.minValue;
};
```
## 单链表公共节点

```
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let a = headA;
    let b = headB;
    while (a !== b) {
        a = a === null ? headB : a.next;
        b = b === null ? headA : b.next;
    }
    
    return a;
};
```
## 找有序数组中和为某一值的两个元素的下标

```
var twoSum = function(numbers, target) {
    let indice = [0,0];
    if (!numbers || numbers.length < 2) return indice;
    let left = 0;
    let right  = numbers.length - 1;
    while (left < right) {
        let e = numbers[left] + numbers[right];
        if (e === target) {
            indice[0] = left + 1;
            indice[1] = right + 1;
            break;
        } else if (e > target) {
            right--;
        } else {
            left++;
        }
    }
    return indice;
};
```
## 数字转字母序（26进制问题）

```
var keys = ['Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'],
        mod, string = ''
    while (n > 0) {
        mod = n % 26
        string = keys[mod] + string
        n = Math.floor((n - 1) / 26)
    }
    return string
```

字母转数字

```
var titleToNumber = function(s) {
    const charCodeBase = 'A'.charCodeAt(0) - 1;
    const n = s.length;
    let number = 0;

    for (let i = 0; i < n; i++)
        number += (s.charCodeAt(i) - charCodeBase) * Math.pow(26, n-i-1);
    
    return number;
};
```
## 利用位运算完成加法

```
var getSum = function(a, b) {
    if (b === 0) return a;
    let sum, carry;
    sum = a^b;
    carry = (a&b) << 1;
    return getSum(sum, carry);
};
```

## 利用牛顿法手动实现开平方根
```
var isPerfectSquare = function(num) {
    let x = num;
    while (x * x > num) {
        x = (x + num / x) >> 1;
    }
    return x * x === num;
};
```

## 求两个数组的相交

```
var intersect = function(nums1, nums2) {
    var res = [],
        i = 0,
        j = 0;
    
    // Sort nums1
    nums1.sort(function(a, b){ 
        return a - b; 
    });
    
    // Sort nums2
    nums2.sort(function(a, b){ 
        return a - b; 
    });
    
    // Traverse through two pointers
    while(j < nums2.length && i < nums1.length){
        if(nums1[i] === nums2[j]){
            res.push(nums2[j]);
            j++;
            i++;
        }
        if(nums2[j] > nums1[i])
            i++;
        if(nums2[j] < nums1[i])
            j++;
    }
    
    return res;
};
```

## 元音字母逆序

```
if(s == null || s.length()==0) return s;
    String vowels = "aeiouAEIOU";
    char[] chars = s.toCharArray();
    int start = 0;
    int end = s.length()-1;
    while(start<end){
        
        while(start<end && !vowels.contains(chars[start]+"")){
            start++;
        }
        
        while(start<end && !vowels.contains(chars[end]+"")){
            end--;
        }
        
        char temp = chars[start];
        chars[start] = chars[end];
        chars[end] = temp;
        
        start++;
        end--;
    }
    return new String(chars);
```

## 修改this指向

```
function bindThis(f, oTarget) {
    return function(){
        return f.apply(oTarget,arguments);
    }
}
```
## 获取url中参数

```
function getUrlParam(sUrl,sKey){
    var result = {};
    //a是匹配项，k是第一个捕获组匹配项，v是第二个捕获组匹配项
    sUrl.replace(/\??(\w+)=(\w+)&?/g,function(a,k,v){
        if(result[k] !== void 0){
            var t = result[k];
            result[k] = [].concat(t,v);
        }else{
            result[k] = v;
        }
    });
    //void 0相当于undefined,比直接写undefined更加安全
    if(sKey === void 0){
        return result;
    }else{
        return result[sKey] || '';
    }
}
```

## 找DOM节点的最近公共祖先
那么这题的思路就是，不用管谁是包含谁，还是兄弟关系，只需要随便选一个节点然后判断一个是否包含另一个，不包含就取该节点的父节点为当前节点，继续循环。

```
function commonParentNode(oNode1, oNode2) {
    while (!oNode1.contains(oNode2)) {
        oNode1 = oNode1.parentNode;
    }
    return oNode1;
}
```
## 根据包名创造对象
> 输入：namespace({a: {test: 1, b: 2}}, 'a.b.c.d')

> 输出：{a: {test: 1, b: {c: {d: {}}}}}

```
function namespace(oNamespace, sPackage) {
    var arr = sPackage.split('.');
    var res = oNamespace;   // 保留对原始对象的引用
 
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] in oNamespace) {  // 空间名在对象中
            if(typeof oNamespace[arr[i]] !== "object") {    // 为原始值
                oNamespace[arr[i]] = {};    // 将此属性设为空对象           
            }  
        } else {    // 空间名不在对象中，建立此空间名属性，赋值为空
            oNamespace[arr[i]] = {};
        }
         
        oNamespace = oNamespace[arr[i]];    // 将指针指向下一个空间名属性。
    }
 
    return res;
 
}
```

## 高级版数组去重
输入中可能有两个NaN，但两个NaN是不能直接用等号判断的，因为他们本来就不相等；类似的情况还有空数组，我们不认为两个空数组是一致的元素。

```
Array.prototype.uniq = function () {
    var hasNaN = false;
    for(var i = 0; i < this.length; i++){
        if(this[i] !== this[i]) hasNaN = true;
        for(var j = i+1; j < this.length;){
            if(this[i] === this[j] ||(hasNaN && this[j] !== this[j])){
                this.splice(j,1);
            }else{
                j++;
            }
        }
    }
    return this;
}
```
## 格式化时间
```
function formatDate(t,str){
  var obj = {
    yyyy:t.getFullYear(),
    yy:(""+ t.getFullYear()).slice(-2),
    M:t.getMonth()+1,
    MM:("0"+ (t.getMonth()+1)).slice(-2),
    d:t.getDate(),
    dd:("0" + t.getDate()).slice(-2),
    H:t.getHours(),
    HH:("0" + t.getHours()).slice(-2),
    h:t.getHours() % 12,
    hh:("0"+t.getHours() % 12).slice(-2),
    m:t.getMinutes(),
    mm:("0" + t.getMinutes()).slice(-2),
    s:t.getSeconds(),
    ss:("0" + t.getSeconds()).slice(-2),
    w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
  };
  return str.replace(/([a-z]+)/ig,function($1){return obj[$1]});
}
```

## 判断邮件
```
function isAvailableEmail(sEmail) {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(sEmail);
}
```
## RGB颜色转换
输入rgb(255,213,22)
```
function rgb2hex(sRGB) {
    var reg = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var ret = sRGB.match(reg);
    if (!ret) {
        return sRGB;
    } else {
		var str='#';
        for(var i=1;i<=3;i++){
            var m=parseInt(ret[i]);
            if(m<=255&&m>=0){
                str+=(m<16?'0'+m.toString(16):m.toString(16));
            }else{
                return sRGB;
            }
        }
        return str;
    }
}
```

