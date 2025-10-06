str="0"
for ii in `seq 1 100000`
do 
str="$str,$(($RANDOM - 10000))" 
echo "$(($RANDOM - 10000))" >> a.random
done
echo $str
