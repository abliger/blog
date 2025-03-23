#include<stdio.h>
#include<stdlib.h> //rand和srand函数头文件
#include<time.h> //time函数头文件
int main()
{
	srand((unsigned int)time(NULL));//使用time函数返回的时间戳作为srand函数的参数，产生rand函数的种子
	printf("%d\n", rand()); 
	return  0;
}
