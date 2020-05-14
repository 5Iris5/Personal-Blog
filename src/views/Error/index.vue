<template>
    <div class="error">
        <Nav></Nav>
        <div id="container">
            <div class="container-main">
                <el-container>
                    <el-main>
                        <img src="../../assets/images/404.gif" alt="页面不存在/页面出错">
                    </el-main>
                    <el-aside style="width: 280px;">
                        <Aside></Aside>
                    </el-aside>
                </el-container>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'
export default {
    name: 'Error',
    components: {
        Nav,
        Aside,
        Footer
    }
}
</script>

<style lang="less" scoped>
.error{
    #container{
        padding-top: 80px;
        >.container-main{
            box-sizing: border-box;
            // width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 50px;
            >.el-container{
                .el-main{
                    width: 800px;
                    padding: 0;
                    margin-right: 20px;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                .el-aside{
                    width: 280px;    
                }
            }
        }
    }
}
</style>