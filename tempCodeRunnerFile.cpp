
#include <iostream>
#include <algorithm>

using namespace std;

// } Driver Code Ends
//User function Template for C++

class Solution{   
    public:
        int maxGoodLength(vector<vector<int>>&a)
        {
            int N = a.size();
        int M = a[0].size();
        int low = 0;
        int high = min(N,M);
        int maxGoodLength = 0;

        while (low <= high) {
            int mid = (low + high + 1) / 2;
            bool found = false;

            for (int i = 0; i <= N - mid; ++i) {
                for (int j = 0; j <= M - mid; ++j) {
                    bool valid = true;

                    for (int x = i; x < i + mid; ++x) {
                        for (int y = j; y < j + mid; ++y) {
                            if (a[x][y] < mid) {
                                valid = false;
                                break;
                            }
                        }

                        if (!valid) {
                            break;
                        }
                    }

                    if (valid) {
                        found = true;
                        break;
                    }
                }

                if (found) {
                    break;
                }
            }

            if (found) {
                maxGoodLength = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return maxGoodLength;
        }
        
};


//{ Driver Code Starts.
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int m,n,i,j;
        cin>>n>>m;
        vector<vector<int>>a(n,vector<int>(m));
        for(i=0;i<n;i++)
        {
            for(j=0;j<m;j++)
            {
                cin>>a[i][j];
            }
        }
        Solution ob;
        int ans=ob.maxGoodLength(a);
        cout<<ans<<endl;
    }
}

// } Driver Code Ends